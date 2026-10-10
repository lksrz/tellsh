// Confusable intent groups (from the v0.2 eval confusions and the catalog) and contrastive rewrite rules
// used by scripts/teacher.js: the teacher always sees the confusable intents as options, and `mine`
// rewrites training rows of one intent into candidate rows of its neighbour, which the teacher must confirm.
const GROUPS = [
  ['find_symlinks', 'broken_symlinks', 'create_symlink'],
  ['find_process', 'service_status', 'kill_by_name', 'top_cpu'],
  ['git_push', 'git_pull', 'git_clone', 'git_commit'],
  ['empty_files', 'empty_dirs', 'find_by_ext', 'find_smaller_than'],
  ['list_files', 'list_tree', 'hidden_files', 'find_by_ext'],
  ['disk_free', 'block_devices', 'disk_mounts', 'dir_size'],
  ['users_logged_in', 'last_logins', 'whoami'],
  ['show_path', 'which_cmd', 'env_var_get', 'env_vars'],
  ['file_type', 'file_stat'],
  ['listening_ports', 'process_on_port', 'port_check', 'kill_by_port'],
  ['docker_ps', 'docker_ps_all', 'docker_images', 'docker_stats'],
  ['service_restart', 'service_start', 'service_stop', 'service_enable'],
  ['ip_addresses', 'public_ip', 'routes'],
];
export const CONFUSABLE = {};
for (const g of GROUPS) for (const a of g) CONFUSABLE[a] = [...new Set([...(CONFUSABLE[a] || []), ...g.filter((b) => b !== a)])];

// from -> target: regex on the training text of `from`, replacement making it a `target` request;
// `bad`: rewrites matching it read wrong ("push … from origin") and are not generated
// word boundaries that understand Polish letters (\b does not)
const W = (src, tail = true) => new RegExp(`(?<![\\p{L}\\d_])(?:${src})${tail ? '(?![\\p{L}\\d_])' : ''}`, 'iu');
export const CONTRAST_RULES = [
  // symlinks <-> broken symlinks
  { from: 'find_symlinks', target: 'broken_symlinks', lang: 'en', re: W(String.raw`(symbolic links|symlinks|soft links|links)`), to: 'broken $1' },
  { from: 'find_symlinks', target: 'broken_symlinks', lang: 'pl', re: W(String.raw`(dowiązania symboliczne|dowiazania symboliczne|dowiązania|dowiazania|symlinki|linki symboliczne)`), to: 'zepsute $1' },
  { from: 'broken_symlinks', target: 'find_symlinks', lang: 'en', re: W(String.raw`(broken|dangling|dead|orphaned)\s+`, false), to: '' },
  { from: 'broken_symlinks', target: 'find_symlinks', lang: 'pl', re: W(String.raw`(zepsute|martwe|wiszące|wiszace|uszkodzone|niedziałające|niedzialajace)\s+`, false), to: '' },
  // push <-> pull
  { from: 'git_push', target: 'git_pull', lang: 'en', re: W(String.raw`push`), to: 'pull', bad: /\b(to|onto|into)\b/i },
  { from: 'git_pull', target: 'git_push', lang: 'en', re: W(String.raw`pull`), to: 'push', bad: /\bfrom\b/i },
  { from: 'git_push', target: 'git_pull', lang: 'pl', re: W(String.raw`(wypchnij|wypchnąć|wypchnac|wyślij|wyslij|pushnij)`), to: 'ściągnij', bad: /(?<![\p{L}])(na|do)(?![\p{L}])/iu },
  { from: 'git_pull', target: 'git_push', lang: 'pl', re: W(String.raw`(ściągnij|sciagnij|pobierz|zaciągnij|zaciagnij|pullnij)`), to: 'wypchnij', bad: /(?<![\p{L}])(z|ze)(?![\p{L}])/iu },
  // process <-> service
  { from: 'find_process', target: 'service_status', lang: 'en', re: W(String.raw`process(es)?`), to: 'service' },
  { from: 'service_status', target: 'find_process', lang: 'en', re: W(String.raw`(service|daemon|unit)`), to: 'process' },
  { from: 'find_process', target: 'service_status', lang: 'pl', re: W(String.raw`proces(y|u|ów)?`), to: 'usługa' },
  { from: 'service_status', target: 'find_process', lang: 'pl', re: W(String.raw`(usługa|usługi|usługę|serwis)`), to: 'proces' },
  // empty files <-> empty dirs
  { from: 'empty_files', target: 'empty_dirs', lang: 'en', re: W(String.raw`files`), to: 'directories' },
  { from: 'empty_dirs', target: 'empty_files', lang: 'en', re: W(String.raw`(directories|folders|dirs)`), to: 'files' },
  { from: 'empty_files', target: 'empty_dirs', lang: 'pl', re: W(String.raw`pliki`), to: 'katalogi' },
  { from: 'empty_dirs', target: 'empty_files', lang: 'pl', re: W(String.raw`(katalogi|foldery)`), to: 'pliki' },
  // disk free <-> block devices
  { from: 'disk_free', target: 'block_devices', lang: 'en', re: W(String.raw`(free|available) (disk )?space`), to: 'disks and partitions' },
  { from: 'block_devices', target: 'disk_free', lang: 'en', re: W(String.raw`(block devices|disks|drives|partitions)`), to: 'free space on the disks' },
  // logged in <-> last logins
  { from: 'users_logged_in', target: 'last_logins', lang: 'en', re: W(String.raw`(is|are) (currently )?logged in`), to: 'logged in recently' },
  { from: 'users_logged_in', target: 'last_logins', lang: 'pl', re: W(String.raw`jest (teraz )?zalogowany`), to: 'się ostatnio logował' },
  // PATH <-> which
  { from: 'which_cmd', target: 'show_path', lang: 'en', re: W(String.raw`where is ([\w.-]+)( installed)?`), to: 'what directories are in my PATH' },
  // list files <-> hidden files
  { from: 'list_files', target: 'hidden_files', lang: 'en', re: W(String.raw`files`), to: 'hidden files' },
  { from: 'list_files', target: 'hidden_files', lang: 'pl', re: W(String.raw`pliki`), to: 'ukryte pliki' },
  // docker ps <-> ps -a
  { from: 'docker_ps', target: 'docker_ps_all', lang: 'en', re: W(String.raw`(running )?containers`), to: 'all containers, including stopped ones' },
  { from: 'docker_ps', target: 'docker_ps_all', lang: 'pl', re: W(String.raw`(działające |dzialajace )?kontenery`), to: 'wszystkie kontenery, także zatrzymane' },
  // restart <-> stop
  { from: 'service_restart', target: 'service_stop', lang: 'en', re: W(String.raw`restart`), to: 'stop' },
  { from: 'service_stop', target: 'service_restart', lang: 'en', re: W(String.raw`stop`), to: 'restart' },
  { from: 'service_restart', target: 'service_stop', lang: 'pl', re: W(String.raw`zrestartuj`), to: 'zatrzymaj' },
  { from: 'service_stop', target: 'service_restart', lang: 'pl', re: W(String.raw`zatrzymaj`), to: 'zrestartuj' },
];
