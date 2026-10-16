// Gate step 3, accountability (ir/lib/API.md "Accountability"): every content token of the request must be
// accounted for by the accepted IR. A free (unconsumed) word is accounted for when it is
//   (a) inside a value span (consumed) or a cue phrase of the cue lexicon (checked by the binding rules),
//   (b) a cue word of an op / mod / const that the IR actually holds (CUE_KEYS), or
//   (c) a closed-lexicon word that carries no content of its own (function words, politeness, generic nouns).
// Uncovered: an unknown content word (not a typo of a known word), a known word that is request content
// (CONTENT_WORDS: "src", "app" are names, not wording), or a cue word whose element is missing
// ("porcelain" without --porcelain, "history" without git log). Runs after strict.js; fails `uncovered_content`.

// Cue word or phrase -> keys, any of which explains it. Key forms: `op`, `op.mod`, `op.mod=const`, `freq`.
const CUE_KEYS = [
  { words: ['porcelain', 'machine-readable', 'machine readable', 'parseable', 'parsable', 'script-friendly'],
    keys: ['git.status.porcelain', 'json.select', 'git.log.format', 'proc.list'] },
  { words: ['history'], keys: ['git.log', 'git.show'] },
  { words: ['whose names', 'whose name', 'whose filename', 'whose filenames', 'whose file name', 'whose file names'],
    keys: ['files.find', 'dir.list', 'files.list', 'git.diff.name_only', 'git.log.name_only', 'git.show.name_only', 'lines.sort', 'text.search!files_with_matches'] },
];

// Known words that name things (directories, packages, apps) rather than ask for something: a free one is content.
const CONTENT_WORDS = new Set(['src', 'lib', 'libs', 'assets', 'vendor', 'dist', 'bin', 'fuzz']);

// Request wording that asks for nothing by itself (tuned on train gold; not a value, not a mod cue).
const GENERIC = new Set(`
already differ differs differed differing different difference compared compare comparing comparison say saying says
cap capped among unit units version versions grepping else msg msgs stream streams i've original way ways take min
rotating load loaded preview collapsing collapse execute executed getting get survives survive surviving begin rn
found lookup possible occurring walk written enter eating generated consumption define defines defined put locate
stuck arrive store forget element elements pass passes passed dropping drop headings braces brackets ping invert default defaults switch produce produces visible
tiny extra pipe piped cheers bit describe made make teh allow kick kicking huge overall kept growing closing handle
copies color normal thanks lol deets happen happens noise space front extended partial dives grabbing parsing exec
holding holds owns owner owners declare alpha alphabetic tcp udp socket sockets uncommitted reference references
referenced dep tracked access appearance granularity sensitivity footprint eye extension extensions hostname
hostnames username usernames two three four five six seven eight nine ten twenty
`.split(/\s+/).filter(Boolean));

const PLAIN_TYPES = new Set(['text', 'shell', 'bash', 'react', 'markdown', 'code', 'source']);
const WORKING_NEXT = new Set(['tree', 'copy', 'dir', 'directory', 'folder']);
// A free word repeated inside a copied value ("the ids in ids.txt", "migration files under migrations/").
const stems = (w) => [w, `${w}s`, w.replace(/s$/, ''), w.replace(/es$/, '')].filter((x) => x.length >= 3);

export function accountability(ir, stages, ctx, h) {
  const { words, consumed, fail, inCue, isUnknownWord, nearKnown, strictKnown } = h;
  const execInfos = stages.filter((s) => s.kind !== 'macro');
  const keys = new Set();
  if (stages.some((s) => s.kind === 'macro')) keys.add('freq');
  for (const i of execInfos) {
    const op = i.exec.op;
    keys.add(op);
    for (const m of i.exec.mods) {
      keys.add(`${op}.${m.mod}`);
      for (const v of m.values || []) if (v.k === 'const') keys.add(`${op}.${m.mod}=${v.id}`);
    }
  }
  const has = (k) => {
    const [base, without] = k.split('!');
    if (!without) return keys.has(base);
    return keys.has(base) && !keys.has(`${base}.${without}`);
  };
  const free = (i) => !consumed.has(i);
  // a head noun right after a named value ("kafka broker", "fastlane report"): one word
  const headNoun = new Set(h.used.filter((v) => !/pattern|grep_message/.test(v.role) || /^[A-Za-z][\w.-]*$/.test(v.value)).map((v) => v.u[1]));
  const valueText = h.used.map((v) => String(v.value).toLowerCase());
  const productNames = h.productNames;
  const echo = (w) => valueText.some((t) => stems(w).some((x) => t.includes(x)));
  const uncovered = [];
  const done = new Set();
  // (b) cue words: explained only by a present element
  for (const r of CUE_KEYS) {
    for (const ph of r.words) {
      const p = ph.split(' ');
      for (let i = 0; i + p.length <= words.length; i++) {
        if (!p.every((w, k) => words[i + k] === w && free(i + k))) continue;
        for (let k = 0; k < p.length; k++) done.add(i + k);
        if (!r.keys.some(has) && !echo(ph)) uncovered.push(`${ph}" needs ${r.keys[0]}`);
      }
    }
  }
  if (uncovered.length) fail('uncovered_content', `"${uncovered[0]}`);
  // (a) / (c): the rest must be a cue, a closed-lexicon word or a typo of one
  // a bare path that is request wording ("the working tree", "machine-readable form")
  for (const v of h.used) {
    if (!['paths', 'rev'].includes(v.role) || /[/.~]/.test(v.value) || v.u[1] - v.u[0] !== 1) continue;
    const w = words[v.u[0]];
    if (w === 'working' && WORKING_NEXT.has(words[v.u[1]])) uncovered.push(`working ${words[v.u[1]]}`);
    const cue = CUE_KEYS.find((r) => r.words.includes(w));
    if (cue && !cue.keys.some(has)) uncovered.push(w);
  }
  // a file type next to globbed ones but used by no value ("png jpg or gif" -> png and gif only)
  const globExt = valueText.some((t) => /\*\.[a-z0-9]+/.test(t));
  words.forEach((w, i) => {
    if (!free(i) || done.has(i) || inCue(i)) return;
    if (globExt && h.isExtWord(w) && !PLAIN_TYPES.has(w) && !valueText.some((t) => t.includes(`.${h.langExt(w)}`))) { uncovered.push(w); return; }
    if (headNoun.has(i) || echo(w)) return;
    if (CONTENT_WORDS.has(w)) { uncovered.push(w); return; }
    if (GENERIC.has(w) || productNames.has(w)) return;
    if (isUnknownWord(w) && !strictKnown(w) && !nearKnown(w)) uncovered.push(w);
  });
  if (uncovered.length) fail('uncovered_content', uncovered.map((w) => `"${w}"`).join(', '));
  ctx.obl.push({ check: 'uncovered_content', ok: true, detail: 'every content word accounted for' });
}
