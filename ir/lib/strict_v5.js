// Gate step 3, v5 round request-aware checks (docs/ir_error_taxonomy_v5.md fixes 2, 4, 5, 6): a number word
// kept as a positional value, a find directory exclusion done with -not -name, curl -g over a URL glob, and file
// names listed (-l / -L) when the request drops them. Called from strict_cover.js with the cover context; every
// failure is `cover: ... [rule id]`. The git fixes (3, 7, 8) live in strict_cover_git.js.

import { DOT_DIRS, BARE_FILES, DROP_NAMES_CUE } from './compile.js';
import { isQuotedUnit } from './units.js';

// fix 2: English number words (cardinal or ordinal), whole value only
const NUM_WORD = /^(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|dozen|zeroth|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth|thirtieth|fortieth|fiftieth|sixtieth|seventieth|eightieth|ninetieth|hundredth)$/i;
// fix 4: names that are directories (a -not -name on them excludes nothing under -type f)
const DIR_NAMES = new Set([...DOT_DIRS, 'node_modules', 'vendor', 'dist', 'build', 'target', 'tests', 'test', '__pycache__', 'venv', '.venv', '.cache']);
// fix 2: the number word is a quantity only next to a counting noun ("fifteen levels", "top five", "all three")
const COUNT_AFTER = new Set(['levels', 'level', 'lines', 'line', 'commits', 'items', 'entries', 'files', 'results', 'times', 'deep', 'depth']);
const COUNT_BEFORE = new Set(['most', 'top', 'first', 'last', 'all', 'depth']);
const DIR_WORD = /\b(folders?|dirs?|directory|directories|subdirector(y|ies)|subfolders?)\b/i;
const EXCEPT_CUE = /\b(except|excluding|exclude|outside|skip|skipping|ignore|ignoring|leave out|leaving out|not in|but not)\b/i;
// fix 5: a curl URL glob ({a,b} alternation or [N-M] range) that -g (always rendered) turns literal
const URL_GLOB = /\{[^{}]*,[^{}]*\}|\[[0-9a-z]+-[0-9a-z]+\]/i;
const LITERAL_URL_CUE = /\b(literal(ly)?|as is|as-is|verbatim|exact(ly)?|no glob(bing)?|without glob(bing)?|globoff|glob off|no expansion|unexpanded)\b/i;
const DROP_NAMES = new RegExp(DROP_NAMES_CUE.source, 'i');

export function v5Obligations(cx) {
  const { fail, execInfos, used, seg } = cx;
  const request = seg.text;

  // fix 2: "fifteen levels" -> npm ls fifteen; a positional value (not a search pattern) that is a number word
  for (const v of used) {
    if (!v.u || String(v.role).startsWith('mod:') || ['pattern', 'name', 'filter'].includes(v.role)) continue;
    if (isQuotedUnit(seg.units[v.u[0]]) || ['named', 'called'].includes(cx.words[v.u[0] - 1])) continue;
    const quantity = COUNT_BEFORE.has(cx.words[v.u[0] - 1]) || COUNT_AFTER.has(cx.words[v.u[1]]);
    if (quantity && NUM_WORD.test(String(v.value))) fail('cover', `${v.role} "${v.value}" is a number word, not a value [num_word_value]`);
  }

  for (const info of execInfos) {
    const op = info.exec.op;
    // fix 4: -type f (or a file glob) with -not -name <directory>: needs -prune (exclude_dir) or -not -path
    if (op === 'files.find') {
      const types = info.modValues.type || [];
      const typeF = !types.includes('d') && (types.includes('f') || ['name_glob', 'any_name'].some((m) => (info.modValues[m] || []).some((g) => /[*?[]/.test(g))));
      if (typeF) {
        for (const g of info.modValues.exclude_glob || []) {
          const x = String(g).replace(/^!/, '');
          const esc = x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          if (new RegExp(`\\bfiles? (named|called) ['"\`]?${esc}(\\W|$)`, 'i').test(request)) continue;
          if (DIR_NAMES.has(x)) fail('cover', `-not -name '${x}' does not exclude the ${x} directory; needs -prune [find_dir_name]`);
          else if (!/[*?[]/.test(x) && !/\.[^/.]+$/.test(x) && !/^\./.test(x) && !BARE_FILES.test(x) && EXCEPT_CUE.test(request) && DIR_WORD.test(request))
            fail('cover', `-not -name '${x}' (no glob, no extension) reads as a directory exclusion; needs -prune [find_dir_name]`);
        }
      }
    }
    // fix 5: curl -g makes {a,b} / [1-3] literal
    if (op.startsWith('net.') || info.tool === 'curl') {
      for (const u of info.values.url || []) {
        if (URL_GLOB.test(String(u)) && !LITERAL_URL_CUE.test(request)) fail('cover', `curl -g keeps the URL glob in ${u} literal [curl_url_glob]`);
      }
    }
    // fix 6: "drop the file names" with lines asked for: -l / -L print only the names
    if (op === 'text.search' && ['files_with_matches', 'files_without_match'].some((m) => cx.hasMod(info, m))
      && DROP_NAMES.test(request) && /\blines?\b/i.test(request))
      fail('cover', '"drop the file names" asks for the lines, not -l / -L [drop_names]');
  }
}
