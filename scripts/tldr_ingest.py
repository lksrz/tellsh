#!/usr/bin/env python3
"""Ingest tldr-pages into tellsh training data (stdlib only).

Usage: python3 -I scripts/tldr_ingest.py [tldr_dir]

The tldr checkout is treated as untrusted *data*: pages are only read and
parsed as text, nothing from it is executed or imported.

Outputs (relative to the repo root):
  data/tldr/tools.jsonl  {"text","tool","lang","page","cmd"}
  data/tldr/flags.jsonl  {"tool","head","sub","flag","long","text","lang","page"}
  data/tldr/README.md    provenance / license / regeneration notes
"""
import json
import os
import re
import subprocess
import sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_TLDR = os.path.join(ROOT, 'data', 'external', 'tldr')
OUT_DIR = os.path.join(ROOT, 'data', 'tldr')

LANG_DIRS = {'en': 'pages', 'pl': 'pages.pl'}
PLATFORMS = ['common', 'linux', 'osx', 'windows']

# --- page name -> tool family ------------------------------------------------
# Plain names apply on every platform; "platform/name" keys override them
# (e.g. Windows `find`/`findstr` search text in files, so they map to grep;
# `type` is cat on Windows but a `which`-like builtin elsewhere).
FAMILY_MAP = {}


def _m(family, *names):
    for n in names:
        FAMILY_MAP[n] = family


_m('find', 'find', 'fd')
_m('du', 'du', 'ncdu', 'dust')
_m('df', 'df', 'duf')
_m('grep', 'grep', 'rg', 'ag', 'egrep', 'select-string', 'windows/find', 'findstr')
_m('wc', 'wc')
_m('sort', 'sort', 'uniq')
_m('ls', 'ls', 'exa', 'eza', 'get-childitem', 'dir')
_m('fileinfo', 'file', 'stat')
_m('head', 'head')
_m('tail', 'tail')
_m('cat', 'cat', 'bat', 'get-content', 'windows/type')
_m('tar', 'tar')
_m('zip', 'zip', 'unzip', 'compress-archive', 'expand-archive')
_m('chmod', 'chmod')
_m('chown', 'chown', 'chgrp')
_m('cp', 'cp', 'copy', 'copy-item')
_m('mv', 'mv', 'move', 'move-item', 'rename-item')
_m('rm', 'rm', 'del', 'remove-item', 'rmdir')
_m('mkdir', 'mkdir', 'md')
_m('touch', 'touch')
_m('pwd', 'pwd', 'get-location')
_m('ln', 'ln')
_m('diff', 'diff', 'cmp', 'fc', 'compare-object')
_m('sed', 'sed')
_m('disks', 'mount', 'findmnt', 'lsblk', 'diskutil', 'fdisk')
_m('hash', 'sha256sum', 'md5sum', 'shasum', 'md5', 'get-filehash', 'certutil')
_m('base64', 'base64')
_m('ps', 'ps', 'pgrep', 'top', 'htop', 'get-process', 'tasklist', 'pstree')
_m('kill', 'kill', 'pkill', 'killall', 'stop-process', 'taskkill')
_m('ss', 'ss', 'netstat', 'lsof', 'get-nettcpconnection')
_m('uname', 'uname', 'sw_vers', 'lsb_release', 'hostnamectl')
_m('free', 'free', 'vm_stat')
_m('cpu', 'lscpu', 'nproc')
_m('uptime', 'uptime')
_m('hostname', 'hostname')
_m('whoami', 'whoami')
_m('who', 'who', 'w', 'last', 'users')
_m('env', 'env', 'printenv', 'export', 'set')
_m('which', 'which', 'whereis', 'type', 'where', 'get-command')
_m('date', 'date', 'cal', 'timedatectl', 'get-date')
_m('crontab', 'crontab')
_m('journalctl', 'journalctl', 'dmesg', 'get-winevent')
_m('systemctl', 'systemctl', 'service', 'launchctl', 'get-service', 'restart-service',
   'stop-service', 'start-service', 'sc')
_m('hardware', 'lsusb', 'lspci', 'sensors', 'upower', 'pmset')
_m('pkg', 'apt', 'apt-get', 'dpkg', 'brew', 'dnf', 'yum', 'pacman', 'winget', 'choco')
_m('ip', 'ip', 'ifconfig', 'ipconfig', 'route', 'get-netipaddress')
_m('curl', 'curl', 'wget', 'invoke-webrequest')
_m('ping', 'ping', 'test-connection')
_m('dig', 'dig', 'nslookup', 'host', 'resolve-dnsname')
_m('traceroute', 'traceroute', 'tracert', 'mtr')
_m('nc', 'nc', 'ncat', 'telnet', 'test-netconnection')
_m('ssh', 'ssh')
_m('git', 'git')
_m('docker', 'docker', 'docker-compose')

# Subcommand page prefixes (git-commit, docker-run, choco-install, ...).
PREFIX_MAP = {'git-': 'git', 'docker-': 'docker', 'choco-': 'pkg'}

# Pages whose family is decided per example rather than per page.
PER_EXAMPLE = {'new-item'}


def page_family(platform, name):
    key = f'{platform}/{name}'
    if key in FAMILY_MAP:
        return FAMILY_MAP[key]
    if name in PER_EXAMPLE:
        return 'per-example'
    if name in FAMILY_MAP:
        return FAMILY_MAP[name]
    for pre, fam in PREFIX_MAP.items():
        if name.startswith(pre):
            return fam
    return None


def new_item_family(desc, cmd):
    """Route a New-Item example to mkdir / ln / touch, or None to skip."""
    m = re.search(r'-ItemType\s+(\{\{)?([^\s}]+)', cmd, re.I)
    if m:
        kind = m.group(2).lower()
        if kind.startswith('directory'):
            return 'mkdir'
        if any(k in kind for k in ('symboliclink', 'hardlink', 'junction')):
            return 'ln'
        if kind.startswith('file'):
            return 'touch'
        return None
    d = desc.lower()
    if 'regist' in d or 'rejestr' in d:  # registry / rejestr
        return None
    if 'file' in d or 'plik' in d:
        return 'touch'
    return None


# --- text cleaning -------------------------------------------------------------
def clean_text(s):
    s = s.strip()
    s = re.sub(r'\{\{(.*?)\}\}', lambda m: m.group(1).split('|')[0], s)  # {{x|y}} -> x
    s = re.sub(r'<(https?://[^>]+)>', r'\1', s)
    s = s.replace('`', '')
    # tldr mnemonic brackets: "[l]ong format", "sorted by [S]ize", "[r]ecursive"
    s = re.sub(r'\[([A-Za-z0-9]{1,3})\](?=[A-Za-z])', r'\1', s)
    s = re.sub(r'(?<=[A-Za-z])\[([A-Za-z0-9]{1,3})\]', r'\1', s)
    s = re.sub(r'(?<![\w\[])\[([A-Za-z0-9])\](?![\w\]])', r'\1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.rstrip(':').rstrip()
    return s


def clean_summary(s):
    s = clean_text(s)
    return s.rstrip('.').strip()


# --- page parsing -------------------------------------------------------------
def parse_page(path):
    with open(path, encoding='utf-8', errors='replace') as f:
        lines = [l.rstrip('\n') for l in f]
    summary = None
    examples = []
    desc = None
    for line in lines:
        st = line.strip()
        if st.startswith('>'):
            if summary is None:
                summary = st[1:].strip()
        elif st.startswith('- '):
            desc = st[2:]
        elif st.startswith('`') and st.endswith('`') and len(st) > 1 and desc is not None:
            examples.append((desc, st[1:-1]))
            desc = None
    return summary, examples


# --- flag extraction ------------------------------------------------------------
FLAG_RE = re.compile(r'^--?[A-Za-z][\w-]*(=.*)?$')


def first_segment(cmd):
    """Return the first pipeline segment, ignoring separators inside {{...}}."""
    out, depth, i = [], 0, 0
    while i < len(cmd):
        if cmd.startswith('{{', i):
            depth += 1; out.append('{{'); i += 2; continue
        if cmd.startswith('}}', i) and depth:
            depth -= 1; out.append('}}'); i += 2; continue
        c = cmd[i]
        if depth == 0 and c in '|;' or (depth == 0 and cmd.startswith('&&', i)):
            break
        out.append(c); i += 1
    return ''.join(out)


def strip_flag_value(f):
    return f.split('=', 1)[0]


def split_alt(inner):
    """'[-h|--human-readable]' -> list of (short, long) pairs, or [] if not flags."""
    if '|' not in inner:
        return []
    left, right = inner.split('|', 1)
    left, right = left.strip(), right.strip()
    if not left.startswith('-'):
        return []
    lt, rt = left.split(), right.split()
    if len(lt) != 1:
        return []
    short = strip_flag_value(lt[0])
    if not FLAG_RE.match(short):
        return []
    rt = [strip_flag_value(t) for t in rt if t.startswith('-')]
    # expand bundled shorts on the long side too: [-lSR|-lS --recursive]
    rt = [u for t in rt for u in (['-' + c for c in t[1:]]
                                    if not t.startswith('--') and len(t) > 2 else [t])]
    if not rt:
        return [(short, None)]
    # bundled short flags: [-sh|--summarize --human-readable], [-la|-l --all]
    if not short.startswith('--') and len(short) > 2 and len(rt) == len(short) - 1:
        pairs = []
        for ch, lng in zip(short[1:], rt):
            if lng.startswith('--'):
                pairs.append(('-' + ch, lng))
            elif lng == '-' + ch:
                pairs.append(('-' + ch, None))
            else:
                return [(short, ' '.join(rt))]
        return pairs
    if len(rt) == 1:
        lng = rt[0]
        if short.startswith('--'):
            return [(short, None)]
        return [(short, lng if lng.startswith('--') else None)]
    return [(short, ' '.join(rt))]


PH_RE = re.compile(r'\{\{(.*?)\}\}')


def extract_flags(cmd):
    seg = first_segment(cmd)
    flags = []
    for m in PH_RE.finditer(seg):
        inner = m.group(1).strip()
        if inner.startswith('[') and inner.endswith(']'):
            flags.extend(split_alt(inner[1:-1]))
        elif '|' in inner:  # {{--context|--before-context|--after-context}}
            alts = [a.strip() for a in inner.split('|')]
            if all(FLAG_RE.match(a) for a in alts):
                for a in alts:
                    a = strip_flag_value(a)
                    flags.append((None, a) if a.startswith('--') else (a, None))
    plain = PH_RE.sub(' X ', seg)
    toks = plain.split()
    # drop quoted regions crudely: tokens starting with a quote until closing
    inq = None
    for t in toks:
        if inq:
            if t.endswith(inq):
                inq = None
            continue
        if t[:1] in '\'"' and not (len(t) > 1 and t.endswith(t[0])):
            inq = t[0]
            continue
        if FLAG_RE.match(t):
            f = strip_flag_value(t)
            flags.append((None, f) if f.startswith('--') else (f, None))
    seen, out = set(), []
    for s, l in flags:
        k = (s, l)
        if k not in seen:
            seen.add(k)
            out.append((s, l))
    return out


def head_sub(cmd):
    toks = PH_RE.sub(' X ', first_segment(cmd)).split()
    while toks and toks[0] in ('sudo', 'doas'):
        toks = toks[1:]
    if not toks:
        return None, None
    head = toks[0].lstrip('(')
    sub = toks[1] if len(toks) > 1 and re.match(r'^[a-z][a-z0-9-]*$', toks[1]) else None
    return head, sub


# --- main ---------------------------------------------------------------------------
def main():
    tldr = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TLDR)
    os.makedirs(OUT_DIR, exist_ok=True)
    rows, flag_rows = [], []
    used, skipped = Counter(), Counter()
    for lang, ldir in LANG_DIRS.items():
        for plat in PLATFORMS:
            d = os.path.join(tldr, ldir, plat)
            if not os.path.isdir(d):
                continue
            for fn in sorted(os.listdir(d)):
                if not fn.endswith('.md'):
                    continue
                name = fn[:-3].lower()
                fam = page_family(plat, name)
                if fam is None:
                    skipped[lang] += 1
                    continue
                page = f'{plat}/{name}'
                summary, examples = parse_page(os.path.join(d, fn))
                used[lang] += 1
                if summary and fam != 'per-example':
                    s = clean_summary(summary)
                    if s and not re.search(r'alias', s, re.I):
                        rows.append({'text': s, 'tool': fam, 'lang': lang, 'page': page,
                                     'cmd': None})
                for desc, cmd in examples:
                    if re.match(r'^\s*tldr\s', cmd):  # alias stubs: `tldr grep`
                        continue
                    text = clean_text(desc)
                    if not text:
                        continue
                    fams = []
                    if fam == 'per-example':
                        f2 = new_item_family(desc, cmd)
                        if f2:
                            fams.append(f2)
                    else:
                        fams.append(fam)
                        if name == 'get-childitem' and re.search(r'-(Recurse|Filter)\b', cmd, re.I):
                            fams.append('find')
                    for f in fams:
                        rows.append({'text': text, 'tool': f, 'lang': lang, 'page': page,
                                     'cmd': cmd})
                    if not fams:
                        continue
                    head, sub = head_sub(cmd)
                    if not head:
                        continue
                    for short, lng in extract_flags(cmd):
                        flag_rows.append({'tool': fams[0], 'head': head, 'sub': sub,
                                          'flag': short or lng, 'long': lng, 'text': text,
                                          'lang': lang, 'page': page})

    with open(os.path.join(OUT_DIR, 'tools.jsonl'), 'w', encoding='utf-8') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    with open(os.path.join(OUT_DIR, 'flags.jsonl'), 'w', encoding='utf-8') as f:
        for r in flag_rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    write_readme(tldr)

    # --- stats ---
    by_fam = Counter(r['tool'] for r in rows)
    by_lang = Counter(r['lang'] for r in rows)
    by_fam_lang = defaultdict(Counter)
    for r in rows:
        by_fam_lang[r['tool']][r['lang']] += 1
    print(f'pages used: {dict(used)} (total {sum(used.values())}); '
          f'skipped: {dict(skipped)} (total {sum(skipped.values())})')
    print(f'tools.jsonl rows: {len(rows)}  per lang: {dict(by_lang)}')
    print('rows per family (total en/pl):')
    for fam, n in sorted(by_fam.items(), key=lambda x: -x[1]):
        c = by_fam_lang[fam]
        print(f'  {fam:12s} {n:5d}  {c["en"]:5d}/{c["pl"]:<5d}')
    by_head = Counter(r['head'] for r in flag_rows)
    uniq_head = defaultdict(set)
    for r in flag_rows:
        uniq_head[r['head']].add(r['flag'])
    print(f'flags.jsonl rows: {len(flag_rows)}  per lang: '
          f'{dict(Counter(r["lang"] for r in flag_rows))}')
    print('flags per head (rows / distinct flags):')
    for h, n in sorted(by_head.items(), key=lambda x: -x[1]):
        print(f'  {h:22s} {n:5d} / {len(uniq_head[h])}')


def write_readme(tldr):
    try:
        commit = subprocess.run(['git', '-C', tldr, 'rev-parse', 'HEAD'], capture_output=True,
                                text=True, check=True).stdout.strip()
    except Exception:
        commit = 'unknown'
    text = f"""# data/tldr

`tools.jsonl` and `flags.jsonl` are derived from
[tldr-pages](https://github.com/tldr-pages/tldr), commit `{commit}`
(English `pages/` and Polish `pages.pl/`; platforms common, linux, osx, windows).

tldr-pages content is licensed under the
[Creative Commons Attribution 4.0 International License (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/),
© the tldr-pages team and contributors.

**Modified:** pages were filtered to the commands relevant to tellsh, example
descriptions were cleaned (trailing colons dropped, backticks/placeholders
unwrapped, mnemonic brackets removed, whitespace collapsed) and mapped to tellsh
tool families; option flags were extracted from example commands.

Files:

- `tools.jsonl`: `{{"text", "tool", "lang", "page", "cmd"}}`; one row per example
  description plus one per page summary (`cmd` is null for summaries).
- `flags.jsonl`: `{{"tool", "head", "sub", "flag", "long", "text", "lang", "page"}}`;
  one row per option flag found in an example command.

## Regenerate

```sh
git clone --depth 1 https://github.com/tldr-pages/tldr data/external/tldr
python3 -I scripts/tldr_ingest.py
```
"""
    with open(os.path.join(OUT_DIR, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(text)


if __name__ == '__main__':
    main()
