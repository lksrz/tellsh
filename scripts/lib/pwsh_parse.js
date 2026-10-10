// PowerShell syntax check that never executes the checked source: the source is passed in an
// environment variable and only handed to the parser. (Anything placed after `-Command <script>`
// would be appended to the script and run.)
import { spawnSync } from 'node:child_process';

export const PWSH_PARSE_SCRIPT = '$e=$null;[void][System.Management.Automation.Language.Parser]::ParseInput($env:TELLSH_PARSE_SRC,[ref]$null,[ref]$e);if($e.Count){exit 1}';

/** -> true (parses), false (syntax errors), null (pwsh could not be started) */
export function pwshParses(src, { bin = 'pwsh', env = process.env } = {}) {
  const r = spawnSync(bin, ['-NoProfile', '-NonInteractive', '-Command', PWSH_PARSE_SCRIPT], { env: { ...env, TELLSH_PARSE_SRC: src }, encoding: 'utf8' });
  if (r.error) return null;
  return r.status === 0;
}
