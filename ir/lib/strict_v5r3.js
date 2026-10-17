// Gate step 3, v5 round 3 (dev4) request-aware checks (docs/ir_error_taxonomy_v5.md "v5 round 3"): --date under
// --oneline, wc on a file operand for a bare-number cue, and a prune of the bare name for "X in the name". Called from
// strict_v5.js with the cover context; every failure is `cover: ... [rule id]`. Fixes r3-a / b / d (derived
// no_filename, implied -type f, derived no_header) live in compile.js.

import { nameCues } from './strict_v5r2.js';

// r3-e: the request wants the count alone; `wc -c FILE` prints "N FILE" (the IR has no `wc -c < FILE`)
const BARE_NUMBER_CUE = /\bnothing else\b|\b(just|only) the (number|count)\b|\bnumber only\b|\bbare number\b|\bwithout the (file ?)?name\b/i;

export function v5r3Obligations(cx) {
  const { fail, execInfos, seg } = cx;
  const request = seg.text;
  // quoted spans are operand values, not cues (round-3 review; same as windowText in strict_cover_git.js)
  const bare = BARE_NUMBER_CUE.test(request.replace(/(["'`]).*?\1/g, ' '));
  const names = nameCues(request).filter((c) => c.neg);

  for (const info of execInfos) {
    const op = info.exec.op;
    // r3-c: --oneline ignores --date
    if ((op === 'git.log' || op === 'git.show') && cx.hasMod(info, 'oneline') && cx.hasMod(info, 'date_format')
      && !cx.hasMod(info, 'format') && !cx.hasMod(info, 'pretty'))
      fail('cover', '--date has no effect with --oneline; needs a --format with a date [oneline_date]');
    // r3-e (an each stage, find -exec / xargs wc, gets file operands from the producer)
    if (bare && op === 'file.count' && (info.kind === 'each' || (info.values.paths || []).length))
      fail('cover', 'wc on a file operand prints the file name after the count ("nothing else" / "just the number") [wc_bare_number]');
    // r3-f: "leaving out any with X in the name" -> a prune of a directory named exactly X excludes nothing else
    if (names.length && op === 'files.find') {
      for (const g of info.modValues.exclude_dir || []) {
        if (names.some((c) => c.x === String(g).toLowerCase()))
          fail('cover', `"${g} in the name" excludes names containing ${g}, not a directory named exactly '${g}' [name_contains]`);
      }
    }
  }
}
