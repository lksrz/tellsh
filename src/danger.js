// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it.

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// [regex, risk, message, critical]
const RULES = [
  [/\brm\s+(?:-[a-zA-Z]*\s+|--\S+\s+)*-[a-zA-Z]*[rR][a-zA-Z]*\s+(?:-\S+\s+)*(?:\/|\/\*|~\/?|\$HOME\/?|"\$HOME"\/?|\*|\.\/?\*?|\.\.)(?:\s|$|;|&|\|)/, 'high', 'recursive rm on /, ~, * or . — would wipe everything', true],
  [/\brm\s+(?:\S+\s+)*--no-preserve-root\b/, 'high', 'rm --no-preserve-root', true],
  [/\brm\s+(?:-\S+\s+)*-[a-zA-Z]*(?:r[a-zA-Z]*f|f[a-zA-Z]*r)/i, 'high', 'rm -rf deletes without asking'],
  [/\brm\b/, 'high', 'rm deletes files permanently (no trash)'],
  [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
  [/\b(?:chmod|chown|chgrp)\s+(?:\S+\s+)*-[a-zA-Z]*R[a-zA-Z]*\s+(?:\S+\s+)*\/(?:\s|$|\*)/, 'high', 'recursive permission/owner change on /', true],
  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
  [/\b(?:curl|wget)\b[^|;]*\|\s*(?:sudo\s+)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
  [/\bsudo\b/, 'medium', 'runs with root privileges'],
  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec\s+rm\b|\bxargs\s+(?:-\S+\s+)*rm\b/, 'high', 'bulk deletion via find/xargs'],
  [/\bgit\s+push\b.*(?:\s--force\b|\s-f\b)/, 'high', 'force-push rewrites remote history'],
  [/\bgit\s+reset\s+--hard\b|\bgit\s+clean\s+-[a-zA-Z]*f|\bgit\s+restore\b|\bgit\s+checkout\s+--\s/, 'high', 'discards uncommitted work'],
  [/\bdocker\s+(?:system|volume|image|container)\s+prune\b|\bdocker\s+rmi?\b/, 'high', 'deletes docker data'],
  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
  [/\b(?:kill|pkill|killall)\b/, 'high', 'terminates processes'],
  [/\bkill\s+(?:-\S+\s+)*-?1\b/, 'high', 'kill -1 / PID 1 kills everything', true],
  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
  [/(?:^|[^0-9>&|])>\s*\/etc\//, 'high', 'overwrites a system config file'],
  [/(?:^|[^0-9>&|-])>(?!>|&|\s*\/dev\/null)\s*\S/, 'medium', 'redirect overwrites a file'],
  [/\bsed\s+(?:-\S+\s+)*-i\b/, 'medium', 'edits files in place'],
  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
];

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe') {
  let risk = baseRisk;
  const warnings = [];
  let critical = false;
  for (const [re, r, msg, crit] of RULES) {
    if (re.test(command)) {
      risk = maxRisk(risk, r);
      if (!warnings.includes(msg)) warnings.push(msg);
      if (crit) critical = true;
    }
  }
  return { risk, warnings, critical };
}
