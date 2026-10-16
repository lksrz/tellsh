// Stable public API of the typed-IR pilot (docs/IR.md). See API.md.

export * from './ir.js';
export {
  loadSchemas, validateSchema, formatProblem, SchemaError, DEFAULT_SCHEMA_DIR,
  EFFECTS, READ_ONLY_EFFECTS, STREAMS, CUE_CLASSES, PLATFORMS, TYPE_ACTIONS,
  opSchema, optionSpec, optionIndex, positionalSpec, valueActions, realize,
  stdoutOf, acceptsStream, pipeIllegal, eachIllegal, effectsOf,
} from './schemas.js';
export { segment, spanText } from './units.js';
export { NORM, normalize, trimSource, parseIntPhrase, escapeRegex, hasRegexMeta, REGEX_META } from './normalizers.js';
export { canon, resolveValue } from './canon.js';
export { compile, quote, renderWord, renderPlan } from './compile.js';
export { decompile } from './decompile.js';
export { gate } from './gate.js';
export { lift } from './lift.js';
