// Tool families: stage 1 of the cascade classifies a request into one of these.
// A family groups intents whose command shares a base tool (PowerShell/cmd equivalents map to the
// same family: Get-ChildItem -> find/ls, Get-Process -> ps, Stop-Process -> kill, ...).
// Stage 2 picks an intent inside the top-k families; stage 3 tags slots allowed for the family.

export const FAMILIES = {
  find: ['find_by_name', 'find_by_ext', 'find_recent', 'find_older_than', 'find_larger_than', 'find_smaller_than',
    'count_files', 'count_lines_code', 'recent_files', 'empty_files', 'empty_dirs', 'duplicate_files',
    'find_symlinks', 'broken_symlinks', 'list_tree', 'hidden_files', 'delete_by_ext', 'largest_files'],
  du: ['largest_dirs', 'dir_size'],
  df: ['disk_free'],
  grep: ['grep_text', 'grep_files_containing', 'history_search'],
  wc: ['count_lines', 'count_words'],
  sort: ['sort_uniq'],
  ls: ['list_files'],
  fileinfo: ['file_type', 'file_stat'],
  head: ['head_file', 'print_line_range'],
  tail: ['tail_file', 'tail_follow'],
  cat: ['cat_file'],
  tar: ['compress_targz', 'extract_targz', 'list_archive'],
  zip: ['compress_zip', 'extract_zip'],
  chmod: ['chmod', 'make_executable'],
  chown: ['chown'],
  cp: ['copy'],
  mv: ['move_rename'],
  rm: ['delete_file', 'delete_dir'],
  mkdir: ['mkdir'],
  touch: ['touch_file'],
  pwd: ['current_dir'],
  ln: ['create_symlink'],
  diff: ['diff_files'],
  sed: ['replace_text'],
  disks: ['disk_mounts', 'block_devices'],
  hash: ['hash_sha256', 'hash_md5'],
  base64: ['base64_encode', 'base64_decode'],
  ps: ['top_cpu', 'top_mem', 'find_process', 'process_tree'],
  kill: ['kill_by_name', 'kill_force', 'kill_by_pid', 'kill_by_port'],
  ss: ['listening_ports', 'process_on_port', 'established_connections'],
  uname: ['system_info', 'os_release', 'kernel_version'],
  free: ['memory_usage'],
  cpu: ['cpu_info', 'cpu_cores'],
  uptime: ['uptime'],
  hostname: ['hostname'],
  whoami: ['whoami'],
  who: ['users_logged_in', 'last_logins'],
  env: ['env_vars', 'env_var_get', 'show_path'],
  which: ['which_cmd'],
  date: ['date_time', 'timezone', 'calendar'],
  crontab: ['cron_list', 'cron_edit'],
  journalctl: ['journal_service', 'journal_errors', 'dmesg'],
  systemctl: ['service_status', 'service_restart', 'service_stop', 'service_start', 'service_enable',
    'list_services', 'failed_services'],
  hardware: ['battery', 'temperature', 'gpu_info', 'usb_devices'],
  pkg: ['install_package', 'package_installed', 'system_update'],
  ip: ['ip_addresses', 'routes'],
  curl: ['public_ip', 'curl_headers', 'http_status', 'download_file'],
  ping: ['ping_host'],
  dig: ['dns_lookup'],
  traceroute: ['traceroute'],
  nc: ['port_check'],
  ssh: ['ssh_connect', 'ssh_port_forward'],
  git: ['git_status', 'git_log', 'git_diff', 'git_diff_staged', 'git_branches', 'git_current_branch',
    'git_new_branch', 'git_switch_branch', 'git_delete_branch', 'git_undo_commit', 'git_discard_changes',
    'git_stash', 'git_stash_pop', 'git_pull', 'git_push', 'git_clone', 'git_add_all', 'git_commit',
    'git_remote', 'git_blame', 'git_init'],
  docker: ['docker_ps', 'docker_ps_all', 'docker_logs', 'docker_images', 'docker_stop', 'docker_stop_all',
    'docker_prune', 'docker_exec', 'docker_stats', 'docker_compose_up', 'docker_compose_down'],
  npm: ['npm_run_script', 'npm_install', 'npm_install_global'],
  python: ['pip_install', 'activate_venv'],
  cli: ['tool_version', 'cli_help'],
  wrangler: ['wrangler_deploy', 'wrangler_dev', 'wrangler_tail', 'wrangler_secret_put', 'wrangler_login', 'wrangler_whoami'],
  gh: ['gh_auth_status', 'gh_auth_login', 'gh_pr_list', 'gh_pr_view', 'gh_pr_create', 'gh_pr_checks', 'gh_pr_merge',
    'gh_run_list', 'gh_run_view'],
};

/** Label used by stage 1 for requests that are not shell tasks at all (chit-chat). */
export const NONE = '__none__';

export const FAMILY_OF = {};
for (const [fam, ids] of Object.entries(FAMILIES)) for (const id of ids) FAMILY_OF[id] = fam;

// Slot tag types produced by the BIO tagger (stage 3).
export const TAG_TYPES = ['PATH', 'SIZE', 'EXT', 'PORT', 'TIME', 'NAME', 'NUM', 'URL', 'HOST', 'BRANCH',
  'PATTERN', 'REPL', 'USER', 'MODE', 'MSG', 'VAR', 'PID', 'TEXT'];

// catalog slot name -> tag type
export const SLOT_TAG = {
  path: 'PATH', file: 'PATH', src: 'PATH', dst: 'PATH', dest: 'PATH', archive: 'PATH',
  count: 'NUM', depth: 'NUM', size: 'SIZE', age: 'TIME', days: 'TIME', since: 'TIME',
  port: 'PORT', pid: 'PID', mode: 'MODE', ext: 'EXT', glob: 'EXT', url: 'URL', host: 'HOST', target: 'HOST',
  name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', start: 'NUM', end: 'NUM', num: 'NUM', branch: 'BRANCH', user: 'USER',
  pattern: 'PATTERN', old: 'PATTERN', new: 'REPL', message: 'MSG', var: 'VAR', text: 'TEXT',
};

// tag types every family may produce in addition to its own (they are cheap and often optional)
const COMMON_TAGS = ['PATH', 'NUM'];

/** family -> Set of allowed tag types (computed from the slots/templates of its intents). */
export function familyTags(BY_ID) {
  const out = {};
  for (const [fam, ids] of Object.entries(FAMILIES)) {
    const s = new Set(COMMON_TAGS);
    for (const id of ids) {
      const it = BY_ID[id];
      const names = new Set(Object.keys(it.slots));
      if (typeof it.template === 'string') for (const m of it.template.matchAll(/\{(\w+)/g)) names.add(m[1]);
      for (const n of names) if (SLOT_TAG[n]) s.add(SLOT_TAG[n]);
    }
    // find-style filters
    if (fam === 'find' || fam === 'grep') { s.add('EXT'); s.add('TIME'); s.add('SIZE'); s.add('NAME'); }
    if (fam === 'journalctl') { s.add('TIME'); s.add('NAME'); }
    if (fam === 'kill') { s.add('PORT'); s.add('PID'); s.add('NAME'); }
    if (fam === 'base64') s.add('TEXT');
    if (fam === 'ssh') s.add('USER');
    out[fam] = s;
  }
  return out;
}
