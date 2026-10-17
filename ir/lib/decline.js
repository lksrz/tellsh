// Gate step 3, decline pre-check (docs/ir_error_taxonomy_v4.md fix 3): requests that name no value for what they
// ask about. Called from obligations.js before strictObligations; every failure is `underspecified: ...`
// (label underspecified) or `dropped_value: ...` / `uncovered_content: ...` (gate_reject).
//   (a) a request ending in a dangling preposition / comparator ("compared to", "containing", "by author");
//   (b) a definite generic noun phrase with no value ("the deprecated helper", "that commit", "in there");
//   (c) a placeholder used as the whole pattern / field / path ("search for text", "the key");
//   (d) a free recency phrase ("this week", "since yesterday") with no since / mtime / newer mod;
//   (e) "upstream" as a bare rev with no remote word (ambiguous: @{u}, a remote, a literal ref);
//   (f) "In DIR, download ..." with no cwd and no output path (the file would land in the cwd);
//   (g) a file-permission filter (executable, writable, -perm) that no schema expresses;
//   (h) a schema gap (git blame / difftool, tac, tail -c +N).
import { isQuotedUnit } from './units.js';

// The lists are this module's own (strict_values.js keeps its DEIXIS set). Tuned on v4 train gold.

// (a) the request's last word(s): nothing follows a word that takes an object
const DANGLING = ['compared to', 'compared with', 'containing', 'matching', 'by author', 'authored by', 'with', 'for', 'of',
  'than', 'named', 'called', 'mentioning', 'against', 'versus', 'vs', 'between', 'except', 'excluding', 'without'];
// "with case-sensitive matching", "whole word matching": the last word is a mode, not a dangling filter
const MATCH_MODIFIER = new Set(['case-sensitive', 'case-insensitive', 'sensitive', 'insensitive', 'word', 'exact', 'literal',
  'fuzzy', 'regex', 'case', 'smart', 'whole-word', 'line', 'pattern']);
// (b) a generic noun that only refers back to something the request never names
const GENERIC_NOUNS = new Set(['function', 'helper', 'hook', 'gem', 'field', 'glob', 'method', 'class', 'variable',
  'constant', 'module', 'endpoint']);
// "the author field", "the name field": the noun names a mod, not a missing value
const NAMED_MODIFIER = new Set(['author', 'message', 'name', 'date', 'subject', 'email', 'status', 'type', 'size']);
const THAT_NOUNS = new Set(['commit', 'branch', 'folder', 'file', 'directory', 'dir', 'process', 'tag']);
// (c) a placeholder word that is never a real pattern / field / path on its own
const PLACEHOLDER = new Set(['text', 'function', 'constant', 'string', 'pattern', 'something', 'somewhere', 'nth', 'key',
  'max', 'i', 'word', 'keyword', 'term', 'thing', 'stuff', 'value', 'name']);
// jq fields: real keys are often plain words (name, max, key); only these never are
const FILTER_PLACEHOLDER = new Set(['i', 'nth', 'json', 'field', 'npm', 'edited']);
const PLACEHOLDER_ROLES = new Set(['pattern', 'mod:grep_message', 'filter', 'paths']);
// "search for the hook", "Gemfile.lock for the gem": a definite generic noun used as the pattern itself
const DEF_PATTERN_NOUNS = new Set(['function', 'helper', 'hook', 'gem', 'method', 'class', 'variable', 'constant', 'module',
  'field', 'key', 'config', 'setting', 'option', 'flag', 'hostname', 'dependency']);
const PATTERN_ROLES = new Set(['pattern', 'mod:grep_message', 'filter']);
// (d) recency phrases and the mods that express them
const RECENCY = ['this week', 'this month', 'this year', 'since yesterday', 'since last week', 'since monday',
  'yesterday', 'last week', 'past week', 'last month', 'past month', 'this morning'];
const RECENCY_LEAD = new Set(['last', 'past']);
const RECENCY_N = /^(\d+|a|one|two|three|four|five|six|seven|ten|few|couple)$/;
const RECENCY_UNIT = /^(days?|weeks?|months?|hours?|minutes?|mins?)$/;
const TIME_MODS = new Set(['since', 'until', 'modified_within_days', 'modified_before_days', 'modified_within_minutes', 'newer']);
// (e) remote words: "upstream" is then a remote name / remote branch
const REMOTE_WORDS = new Set(['remote', 'remotes', 'origin', 'tracking', 'fork']);
// (g) permission filters no schema has (find -perm / -executable)
const PERM_WORDS = new Set(['executable', 'executables', 'non-executable', 'writable', 'world-writable', 'setuid', 'perm', 'perms', 'permission', 'permissions', 'chmod']);

// (h) schema gaps (fix 22): no op expresses these, so a command for them answers something else
const GAP_WORDS = new Set(['blame', 'difftool', 'tac', 'annotate']);
const GAP_BYTE_FROM = /\bfrom byte (\d+|[a-z]+) (to|till|until|through) the end\b|\bbytes? (\d+) onwards?\b/i;

export const DECLINE_RULES = ['dangling', 'generic_np', 'placeholder', 'recency', 'upstream', 'download_dir', 'perm', 'gap'];

export function declineObligations(cx) {
  const { words, consumed, fail, hasFree, execInfos, used, seg } = cx;
  const off = new Set(String(cx.env?.declineOff || '').split(',').filter(Boolean));
  const on = (r) => !off.has(r);
  const n = words.length;
  const ops = new Set(execInfos.map((i) => i.exec.op));
  const hasModAny = (set) => execInfos.some((i) => i.exec.mods.some((m) => set.has(m.mod)));
  const covered = (i) => i >= 0 && i < n && consumed.has(i);
  const valueNear = (a, b) => used.some((v) => v.u && v.u[0] < b && v.u[1] > a);
  const valueTexts = used.map((v) => String(v.value).toLowerCase());
  const fail2 = (check, detail, label) => fail(check, detail, label);

  // (a) dangling preposition / comparator at the end (trailing punctuation dropped)
  if (on('dangling')) {
    let end = n;
    while (end > 0 && /^[.?!,;:]$/.test(seg.units[end - 1].t)) end--;
    for (const ph of DANGLING) {
      const p = ph.split(' ');
      const a = end - p.length;
      if (p.length === 1 && MATCH_MODIFIER.has(words[a - 1])) continue;
      // the dangling word itself taken as the value ("files containing" -> rg containing) is still dangling
      const free = (k) => !consumed.has(k) || used.some((v) => v.u && v.u[0] === k && v.u[1] === k + 1 && String(v.value).toLowerCase() === words[k]);
      if (a > 0 && p.every((w, k) => words[a + k] === w && free(a + k))) fail2('underspecified', `request ends in "${ph}" with no object`, 'underspecified');
    }
  }

  // (b) "the [adj] helper" / "that commit" / "in there" with no value next to it
  if (on('generic_np')) {
    for (let i = 0; i < n; i++) {
      if (consumed.has(i)) continue;
      const w = words[i];
      if (w === 'the' || w === 'that') {
        const set = w === 'the' ? GENERIC_NOUNS : THAT_NOUNS;
        for (const j of [i + 1, i + 2]) {
          if (j >= n || !set.has(words[j]) || consumed.has(j)) continue;
          // "the deprecated helper" with the modifier taken as the pattern names no helper either
          const modPat = j === i + 2 && used.some((v) => v.u && v.u[0] === i + 1 && v.u[1] === i + 2 && ['pattern', 'mod:grep_message'].includes(v.role)
            && /^[a-z]+$/.test(String(v.value)));
          if (j === i + 2 && ((consumed.has(i + 1) && !modPat) || set.has(words[i + 1]))) continue;
          // a value right after the noun names it ("the helper parse_args", "that branch feat/x"); a modifier a value
          // spells names it too ("the version field" -> .version, "the metrics endpoint" -> .../metrics)
          if (valueNear(j + 1, j + 2) || (['named', 'called'].includes(words[j + 1]) && valueNear(j + 2, j + 3))) continue;
          if (j === i + 2 && !modPat && (NAMED_MODIFIER.has(words[i + 1]) || valueTexts.some((t) => t.includes(words[i + 1])))) continue;
          // "that dir" / "that branch" refers back to a value named before it
          if (w === 'that' && used.some((v) => v.u && v.u[1] <= i)) continue;
          fail2('underspecified', `"${words.slice(i, j + 1).join(' ')}" names no value`, 'underspecified');
        }
      }
      // "for the hook", "the gem": the generic noun itself taken as the pattern
      if (w === 'the') {
        const j = DEF_PATTERN_NOUNS.has(words[i + 1]) ? i + 1 : DEF_PATTERN_NOUNS.has(words[i + 2]) && !consumed.has(i + 1) ? i + 2 : -1;
        const v = j >= 0 && used.find((x) => x.u && x.u[0] === j && x.u[1] === j + 1 && PATTERN_ROLES.has(x.role));
        if (v && String(v.value).toLowerCase() === words[j]) fail2('underspecified', `"${words.slice(i, j + 1).join(' ')}" names no value`, 'underspecified');
      }
      if (w === 'in' && words[i + 1] === 'there' && !consumed.has(i + 1) && !used.some((v) => v.role === 'paths')) fail2('underspecified', '"in there" names no place', 'underspecified');
    }
  }

  // (c) a placeholder as the whole value of its role
  if (on('placeholder')) {
    for (const v of used) {
      if (!['span', 'norm:jq_path'].includes(v.kind) || !v.u || v.u[1] - v.u[0] !== 1 || !PLACEHOLDER_ROLES.has(v.role)) continue;
      const val = String(v.value).replace(/^\./, ''), lw = val.toLowerCase();
      if (val !== lw || !(v.role === 'filter' ? FILTER_PLACEHOLDER : PLACEHOLDER).has(lw) || isQuotedUnit(seg.units[v.u[0]])) continue;
      // "the word text", "a string named foo": a quoted / named value is a real one; another value of the
      // same role means the placeholder is just wording
      if (used.some((x) => x !== v && x.role === v.role)) continue;
      fail2('underspecified', `${v.role} "${v.value}" is a placeholder`, 'underspecified');
    }
  }

  // (d) a free recency phrase with no time mod
  if (on('recency') && !hasModAny(TIME_MODS)) {
    const ph = hasFree(RECENCY);
    if (ph) fail2('dropped_value', `recency "${ph}" is not expressed`);
    for (let i = 0; i + 2 < n; i++) {
      if (!RECENCY_LEAD.has(words[i]) || !RECENCY_N.test(words[i + 1]) || !RECENCY_UNIT.test(words[i + 2])) continue;
      if ([i, i + 1, i + 2].some((k) => consumed.has(k))) continue;
      fail2('dropped_value', `recency "${words.slice(i, i + 3).join(' ')}" is not expressed`);
    }
  }

  // (e) "upstream" as a bare rev
  if (on('upstream')) {
    for (const v of used) {
      if (!['rev', 'mod:rev'].includes(v.role) || String(v.value).toLowerCase() !== 'upstream') continue;
      if (words.some((w) => REMOTE_WORDS.has(w))) continue;
      fail2('underspecified', '"upstream" is ambiguous: tracking branch, a remote, or a ref', 'underspecified');
    }
  }

  // (f) "in DIR, download ..." with neither cd nor an output path
  if (on('download_dir') && (ops.has('http.download') || ops.has('http.get'))) {
    const di = words.indexOf('download');
    const lead = words[0] === 'in' || words[0] === 'into' ? 0 : -1;
    if (lead === 0 && di > 1 && di <= 5) {
      const dirU = [1, di];
      const usedDir = used.some((v) => v.u && v.u[0] >= dirU[0] && v.u[1] <= dirU[1]);
      if (!usedDir) fail2('dropped_value', `"in ${words.slice(1, di).join(' ')}" (download directory) is not used`);
    }
  }

  // (g) permission filters are not expressible
  if (on('perm') && ops.has('files.find')) {
    // "not executable" taken as -not -name executable is the same gap
    for (const v of used) if (/^mod:(name_glob|any_name|exclude_glob)$/.test(v.role) && PERM_WORDS.has(String(v.value).toLowerCase())) fail2('uncovered_content', `"${v.value}" (permission filter) is not a name`);
    for (let i = 0; i < n; i++) if (!covered(i) && PERM_WORDS.has(words[i])) fail2('uncovered_content', `"${words[i]}" (permission filter) is not expressible`);
  }

  // (h) schema gaps: git blame / difftool, tac, tail -c +N ("from byte N to the end")
  if (on('gap')) {
    for (let i = 0; i < n; i++) if (!covered(i) && GAP_WORDS.has(words[i])) fail2('uncovered_content', `"${words[i]}" has no schema`);
    if (ops.has('file.tail') && GAP_BYTE_FROM.test(seg.text || '')) fail2('uncovered_content', '"from byte N to the end" (tail -c +N) has no schema');
  }
}
