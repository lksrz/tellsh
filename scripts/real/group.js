// Command groups for the real-usage train / eval split (scripts/real/prepare_real.js): a value-masked command skeleton,
// head + subcommands + sorted flags + number of operands, so `gh pr view 12 --repo a/b` and `gh pr view 40 --repo c/d`
// are one group.
export const strip = (c) => c.trim().replace(/^(?:sudo |npx (?:-y )?|env \w+=\S+ )+/, '');

// subcommand levels per tool for the structural grouping (`gh pr merge`, `docker compose up`, `npm install`; `cat`: none)
const SUBCOMMAND_DEPTH = { git: 1, docker: 2, podman: 2, kubectl: 1, gh: 2, npm: 1, pnpm: 1, yarn: 1, bun: 1, pip: 1, pip3: 1, cargo: 1,
  go: 1, systemctl: 1, apt: 1, 'apt-get': 1, brew: 1, dnf: 1, yum: 1, conda: 1, helm: 1, terraform: 1, aws: 2, gcloud: 3, az: 2,
  wrangler: 2, snap: 1, rustup: 1, poetry: 1, uv: 1, nmcli: 2, ip: 2, launchctl: 1, defaults: 1, flatpak: 1, pm2: 1, supabase: 2, vercel: 1 };

/**
 * mode 'v04' (the split the shipped model was trained on): up to two lower-case words after the head, so operands
 * (`npm install express` / `cat alpha`) stay in the skeleton; 'structural': only the tool's own subcommand levels.
 */
export function group(cmd, mode = 'v04') {
  const w = strip(cmd).split(/\s+/);
  const head = [w[0]];
  let i = 1;
  const depth = mode === 'structural' ? SUBCOMMAND_DEPTH[w[0]] ?? 0 : 2;
  while (i < w.length && head.length <= depth && /^[a-z][a-z-]*$/.test(w[i])) head.push(w[i++]);
  const flags = new Set();
  let ops = 0;
  for (; i < w.length; i++) {
    if (/^-{1,2}[A-Za-z][\w-]*/.test(w[i])) flags.add(w[i].replace(/=.*/, ''));
    else if (!/^[|;&]/.test(w[i])) ops++;
  }
  return `${head.join(' ')} ${[...flags].sort().join(' ')} #${Math.min(ops, 3)}`;
}
