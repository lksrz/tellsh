// Gate step 3, v5 round 2 (dev4) request-aware checks (docs/ir_error_taxonomy_v5.md "v5 round 2"): context
// direction (-A / -B / -C), "X in the name" globs, and per-file line counts read as match counts. Called from
// strict_v5.js with the cover context; every failure is `cover: ... [rule id]`. Fix r2-4 (implied --oneline before a
// grep) lives in compile.js impliedOneline.

// r2-1: context direction cues
const TRAIL_CUE = /\b(trailing|after|following)[- ]context\b|\blines? (of context )?(after|following)\b/i;
const LEAD_CUE = /\b(leading|before|preceding|prior)[- ]context\b|\blines? (of context )?(before|preceding)\b/i;
const BOTH_CUE = /\b(before and after|after and before|both sides|either side|each side)\b/i;
const CTX_CUE = /\b(context|around|surrounding)\b/i;
const SEARCH_TOOLS = new Set(['rg', 'grep']);

// r2-2: "with X in the name", "named like X", "whose name contains X" (X captured)
const NAME_CUES = [
  /\b(?:with|having|has|have|containing) (?:an? |the )?['"`]?([\w.-]+?)['"`]? in (?:the |its |their )?(?:file ?)?names?\b/gi,
  /\bnamed like ['"`]?([\w.-]+)/gi,
  /\b(?:file ?)?names? (?:contains?|containing|includes?|including) (?:the (?:word|string) )?['"`]?([\w.-]+)/gi,
];
const NAME_GLOB_MODS = ['name_glob', 'exclude_glob', 'any_name'];
// polarity: an exclusion word earlier in the cue's clause ("except / without ... X in the name") wants the negated glob
const EXCLUDE_BEFORE = /\b(except|excluding|exclude|without|leaving out|leave out|skip|skipping|ignore|ignoring|omit|omitting|minus|not|but not|other than)\b[^,;]{0,40}$/i;
// a value the request names exactly ("named X", "called X") is never required to be *X*
const EXACT_NAME = /\b(?:named|called)(?! like) ['"`]?([\w.-]+)/gi;

// r2-3: the total line count of each matching file (rg -l -0 X | xargs -0 wc -l), not rg -c (matching lines)
const FILE_LINES_CUES = [
  // "line counts of (each / every) file(s) [in DIR] that / with / containing / where ..."
  /\bline[- ]counts? (?:of|for|per|in)(?: each| every| all| the| all the)?(?: [\w-]+)?(?: matching)? files?\b[^,;]{0,40}?\b(?:that|which|with|containing|contains|mentioning|mentions|where|having|has|have)\b/i,
  // "line counts of the matching files"
  /\bline[- ]counts? of (?:the |each |every )?(?:matching|such) files?\b/i,
];
// "everything with X in it ..., line count per file"
const PER_FILE_LINES = /\bline[- ]counts? (?:per|for each|of each|for every|of every) file\b/i;
const IN_IT = /\b(everything|anything|files?|whatever)\b[^,;]{0,40}\b(with|containing|mentioning) \S+ in (it|them)\b/i;
// match-count wording keeps -c: "matching line count", "count lines", "how many lines", "lines that match / with X"
const MATCH_COUNT_CUE = /\bmatch(ing|ed)? lines?\b|\blines? (that |which )?match|\bcount (the )?lines\b|\bhow many lines\b|\blines (with|containing|mentioning)\b|\bmatching line[- ]counts?\b/i;

export const contextDirection = (request) => {
  if (typeof request !== 'string' || BOTH_CUE.test(request)) return null;
  const trail = TRAIL_CUE.test(request), lead = LEAD_CUE.test(request);
  const rest = request.replace(new RegExp(TRAIL_CUE.source, 'gi'), ' ').replace(new RegExp(LEAD_CUE.source, 'gi'), ' ');
  // a bare before / after elsewhere ("three lines before and one after") names the other side too
  const before = /\b(before|preceding|leading)\b/i.test(request), after = /\b(after|following|trailing)\b/i.test(request);
  if (CTX_CUE.test(rest)) return trail || lead || before || after ? null : 'both';
  if (trail && !before) return 'after';
  if (lead && !after) return 'before';
  return null;
};

export const nameCues = (request) => {
  if (typeof request !== 'string') return [];
  const exact = new Set([...request.matchAll(EXACT_NAME)].map((m) => m[1].toLowerCase()));
  return NAME_CUES.flatMap((re) => [...request.matchAll(re)].map((m) => ({ x: m[1].toLowerCase(),
    neg: EXCLUDE_BEFORE.test(request.slice(0, m.index)) }))).filter((c) => !exact.has(c.x));
};
export const nameContains = (request) => nameCues(request).map((c) => c.x);

export const requestWantsFileLineCounts = (request) => typeof request === 'string' && !MATCH_COUNT_CUE.test(request)
  && (FILE_LINES_CUES.some((re) => re.test(request)) || (PER_FILE_LINES.test(request) && IN_IT.test(request)));

export function v5r2Obligations(cx) {
  const { fail, execInfos, seg } = cx;
  const request = seg.text;
  const dir = contextDirection(request);
  const names = nameCues(request);
  const fileLines = requestWantsFileLineCounts(request);

  for (const info of execInfos) {
    const op = info.exec.op;
    if (op === 'text.search' && SEARCH_TOOLS.has(info.tool) && dir) {
      const has = (m) => cx.hasMod(info, m);
      if (dir === 'after' && (has('context') || has('before'))) fail('cover', `"trailing / after context" asks for -A, not ${has('context') ? '-C' : '-B'} [context_dir]`);
      if (dir === 'before' && (has('context') || has('after'))) fail('cover', `"leading / before context" asks for -B, not ${has('context') ? '-C' : '-A'} [context_dir]`);
      if (dir === 'both' && !has('context') && (has('after') !== has('before'))) fail('cover', `"context / around" asks for -C, not ${has('after') ? '-A' : '-B'} [context_dir]`);
    }
    if (names.length && (op === 'text.search' || op === 'files.find')) {
      for (const m of NAME_GLOB_MODS) for (const g of info.modValues[m] || []) {
        const x = String(g).replace(/^!/, ''), neg = m === 'exclude_glob' || String(g).startsWith('!');
        if (!/[*?[]/.test(x) && !/\.[^/.]+$/.test(x) && names.some((c) => c.x === x.toLowerCase() && c.neg === neg))
          fail('cover', `"${x} in the name" needs the glob *${x}*, not the bare name '${x}' [name_contains]`);
      }
    }
    if (fileLines && op === 'text.search' && info.position === 'first' && cx.hasMod(info, 'count'))
      fail('cover', '"line count of each file with X" asks for the files\' total lines (rg -l -0 X | xargs -0 wc -l), not -c [file_line_counts]');
  }
}
