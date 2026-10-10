// Per-shell / per-OS template variants (see src/render.js for precedence). Keys are intent ids from src/catalog.js.
//
// Keys per intent (all optional):
//   bsd      macOS/BSD userland (bash/zsh/sh on macOS without GNU coreutils), used before catalog `darwin`
//   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
//   busybox  BusyBox userland (Alpine etc.) - only where the GNU template uses flags/tools busybox lacks
//   fish     fish 3.x - only where the POSIX template is not valid fish
//   pwsh     PowerShell: a string (all OSes) or { win, unix }. A missing `unix` means the renderer falls back
//            to `bash -c '<posix command>'` (used where Linux and macOS natives differ). A missing `win`
//            is a Windows gap and is explained in gaps.pwsh ("Windows: ...").
//   cmd      cmd.exe, best effort
//   gaps     { shell: reason } when a shell/OS has no reasonable equivalent
//
// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
// PowerShell variants avoid `&&`/`||` (5.1 compat) and aliases, use -LiteralPath for user paths and
// never add -Force to destructive cmdlets unless the POSIX template forces too. Derived slots:
// ext (bare extension), minutes (time window in minutes), sizeBytes (size in bytes).

// Recursive file listing used by many PowerShell variants (-Force = include hidden files, like find).
const PS_FILES = 'Get-ChildItem -LiteralPath {path} -File -Recurse -Force -ErrorAction SilentlyContinue';
const PS_ALL = 'Get-ChildItem -LiteralPath {path} -Recurse -Force -ErrorAction SilentlyContinue';
const PS_FULLNAME = 'Select-Object -ExpandProperty FullName';
const PS_PROC_MATCH = 'Get-Process | Where-Object { $_.ProcessName -match {name} -or $_.CommandLine -match {name} }';
const PS_OS = 'Get-CimInstance -ClassName Win32_OperatingSystem';
const isWin = (ctx) => (ctx && ctx.os) === 'win32';

export const VARIANTS = {
  // ---------- files & disk ----------
  largest_files: {
    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
  },
  largest_dirs: {
    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
  },
  disk_free: {
    pwsh: { win: 'Get-PSDrive -PSProvider FileSystem', unix: 'df -h' },
    cmd: 'fsutil volume diskfree C:',
  },
  dir_size: {
    pwsh: `${PS_FILES} | Measure-Object -Property Length -Sum | Select-Object Count, Sum, @{ Name = 'MB'; Expression = { [math]::Round($_.Sum / 1MB, 1) } }`,
    cmd: 'dir /s /a {path}',
  },
  find_by_name: {
    pwsh: `${PS_ALL} | Where-Object Name -Like {namepat} | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {namepat}',
  },
  find_by_ext: {
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {glob}',
  },
  find_recent: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
  },
  find_older_than: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
  },
  find_larger_than: {
    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
  },
  find_smaller_than: {
    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
  },
  grep_text: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  count_lines: {
    pwsh: '@(Get-Content -LiteralPath {file}).Count',
    cmd: 'find /c /v "" {file}',
  },
  count_lines_code: {
    pwsh: `(${PS_FILES} | Where-Object Name -Like {glob} | Get-Content | Measure-Object).Count`,
    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
  },
  count_files: {
    pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  },
  recent_files: {
    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
  },
  empty_files: {
    pwsh: `${PS_FILES} | Where-Object Length -EQ 0 | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
  },
  empty_dirs: {
    pwsh: `Get-ChildItem -LiteralPath {path} -Directory -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot test directories for emptiness recursively' },
  },
  duplicate_files: {
    gnuMac: 'find {path} -type f -exec gmd5sum {} + | gsort | guniq -w32 -dD',
    busybox: "find {path} -type f -exec md5sum {} + | sort | awk '{ k = substr($0, 1, 32) } k == p { if (!shown) print last; print; shown = 1; next } { p = k; last = $0; shown = 0 }'",
    pwsh: `${PS_FILES} | Get-FileHash -Algorithm MD5 | Group-Object -Property Hash | Where-Object Count -GT 1 | ForEach-Object Group | Select-Object Hash, Path`,
    gaps: { cmd: 'cmd.exe cannot hash and group files' },
  },
  find_symlinks: {
    busybox: 'find {path} -type l -exec ls -l {} +',
    pwsh: `${PS_ALL} | Where-Object LinkType -EQ 'SymbolicLink' | Select-Object FullName, Target`,
    cmd: 'dir /s /al {path}',
  },
  broken_symlinks: {
    busybox: 'find -L {path} -type l',
    pwsh: `${PS_ALL} | Where-Object { $_.LinkType -eq 'SymbolicLink' -and -not (Test-Path -LiteralPath ([System.IO.Path]::Combine((Split-Path -LiteralPath $_.FullName -Parent), [string]$_.Target))) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot check symlink targets' },
  },
  list_files: {
    pwsh: 'Get-ChildItem -LiteralPath {path} -Force',
    cmd: 'dir /a {path}',
  },
  list_tree: {
    pwsh: String.raw`Get-ChildItem -LiteralPath {path} -Recurse -Depth ({depth!raw} - 1) -Force -ErrorAction SilentlyContinue | Where-Object FullName -NotMatch '[\\/]\.git([\\/]|$)' | Sort-Object FullName | ` + PS_FULLNAME,
    gaps: { cmd: 'tree has no depth limit' },
  },
  hidden_files: {
    pwsh: "Get-ChildItem -LiteralPath {path} -Force | Where-Object { $_.Name -like '.*' -or $_.Attributes -band [System.IO.FileAttributes]::Hidden }",
    cmd: 'dir /a:h {path}',
  },
  file_type: {
    // Windows has no content sniffing like file(1); show what the filesystem knows instead.
    pwsh: { win: 'Get-Item -LiteralPath {file} -Force | Select-Object Name, Extension, Length, Attributes, LinkType', unix: 'file {file}' },
    gaps: { cmd: 'no file(1) equivalent on Windows' },
  },
  file_stat: {
    pwsh: 'Get-Item -LiteralPath {file} -Force | Format-List FullName, Mode, Length, CreationTime, LastWriteTime, LastAccessTime',
    cmd: 'dir /a /q {file}',
  },
  head_file: {
    pwsh: 'Get-Content -LiteralPath {file} -TotalCount {count!raw}',
    gaps: { cmd: 'cmd.exe has no head equivalent' },
  },
  tail_file: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail {count!raw}',
    gaps: { cmd: 'cmd.exe has no tail equivalent' },
  },
  tail_follow: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail 10 -Wait',
    gaps: { cmd: 'cmd.exe cannot follow a file' },
  },
  cat_file: {
    pwsh: 'Get-Content -LiteralPath {file}',
    cmd: 'type {file}',
  },
  compress_targz: {
    pwsh: 'tar -czvf {archive} {path}', // tar.exe ships with Windows 10 1803+
    cmd: 'tar -czvf {archive} {path}',
  },
  extract_targz: {
    pwsh: 'tar -xzvf {file}«-C {dest}»',
    cmd: 'tar -xzvf {file}«-C {dest}»',
  },
  compress_zip: {
    pwsh: 'Compress-Archive -LiteralPath {path} -DestinationPath {archive}',
    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
  },
  extract_zip: {
    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file)} -DestinationPath ${s.dest ? q(s.dest) : '.'}`,
    cmd: 'tar -xf {file}«-C {dest}»',
  },
  list_archive: {
    // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`),
    cmd: 'tar -tvf {file}',
  },
  chmod: {
    pwsh: { unix: 'chmod {mode!raw} {file}' },
    gaps: { pwsh: 'Windows: no POSIX permission bits (use icacls)', cmd: 'no POSIX permission bits (use icacls)' },
  },
  make_executable: {
    pwsh: { unix: 'chmod +x {file}' },
    gaps: { pwsh: 'Windows: no executable bit (determined by file extension)', cmd: 'no executable bit (determined by file extension)' },
  },
  chown: {
    pwsh: { win: 'icacls {path} /setowner {user} /T', unix: 'sudo chown -R {user} {path}' },
    cmd: 'icacls {path} /setowner {user} /T',
  },
  copy: {
    // -Confirm keeps cp -i's "ask before overwriting" safety (Copy-Item overwrites silently).
    pwsh: 'Copy-Item -LiteralPath {src} -Destination {dst} -Recurse -Confirm',
    cmd: 'copy /-y {src} {dst}',
  },
  move_rename: {
    // Move-Item refuses to overwrite an existing file without -Force, which matches mv -i's safety.
    pwsh: 'Move-Item -LiteralPath {src} -Destination {dst}',
    cmd: 'move /-y {src} {dst}',
  },
  delete_file: {
    pwsh: 'Remove-Item -LiteralPath {file}',
    cmd: 'del {file}',
  },
  delete_dir: {
    pwsh: 'Remove-Item -LiteralPath {path} -Recurse',
    cmd: 'rmdir /s {path}',
  },
  delete_by_ext: {
    busybox: 'find {path} -type f -iname {glob} -exec rm {} +',
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob} | Remove-Item`,
    cmd: 'pushd {path} && (del /s {glob} & popd)',
  },
  mkdir: {
    // -Force on a directory only means "create parents, do not fail if it exists" (mkdir -p).
    pwsh: 'New-Item -ItemType Directory -Force -Path {path}',
    cmd: 'mkdir {path}',
  },
  touch_file: {
    pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
    cmd: 'type nul >> {file}',
  },
  current_dir: {
    pwsh: 'Get-Location',
    cmd: 'cd',
  },
  create_symlink: {
    pwsh: 'New-Item -ItemType SymbolicLink -Path {dst} -Target {src}',
    cmd: 'mklink {dst} {src}',
  },
  diff_files: {
    pwsh: {
      win: 'Compare-Object -ReferenceObject (Get-Content -LiteralPath {src}) -DifferenceObject (Get-Content -LiteralPath {dst})',
      unix: 'diff -u {src} {dst}',
    },
    cmd: 'fc {src} {dst}',
  },
  replace_text: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new}) | Set-Content -LiteralPath {file} -NoNewline',
    gaps: { cmd: 'cmd.exe has no in-place text replacement' },
  },
  disk_mounts: {
    busybox: 'mount',
    pwsh: { win: 'Get-Volume' },
    cmd: 'mountvol',
  },
  block_devices: {
    busybox: 'cat /proc/partitions',
    pwsh: { win: 'Get-Partition' },
    gaps: { cmd: 'wmic is deprecated/removed and diskpart needs admin' },
  },
  hash_sha256: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm SHA256',
    cmd: 'certutil -hashfile {file} SHA256',
  },
  hash_md5: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm MD5',
    cmd: 'certutil -hashfile {file} MD5',
  },
  base64_encode: {
    pwsh: (s, q) => (s.file
      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file)}).ProviderPath))`
      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>')}))`),
    gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
  },
  base64_decode: {
    pwsh: (s, q) => (s.file
      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file)} -Raw)))`
      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>')}))`),
    gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
  },

  // ---------- processes ----------
  top_cpu: {
    busybox: 'top -b -n 1 | head -n $(({count!raw} + 4))',
    pwsh: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'tasklist cannot sort by CPU usage' },
  },
  top_mem: {
    busybox: 'ps -o pid,user,rss,vsz,args | sort -k3 -rh | head -n {count!raw}',
    pwsh: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First {count!raw}',
    cmd: 'tasklist | sort /r /+65', // Mem Usage column is right-aligned starting at column 65
  },
  find_process: {
    pwsh: `${PS_PROC_MATCH} | Select-Object Id, ProcessName, CommandLine`,
    cmd: 'tasklist | findstr /i {name}',
  },
  kill_by_name: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
  },
  kill_force: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
  },
  kill_by_pid: {
    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
    pwsh: { win: 'Stop-Process -Id {pid!raw}', unix: '/bin/kill {pid!raw}' },
    cmd: 'taskkill /pid {pid!raw}',
  },
  kill_by_port: {
    busybox: 'fuser -k -TERM {port!raw}/tcp',
    pwsh: { win: 'Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ }' },
    cmd: 'for /f "tokens=5" %p in (\'netstat -ano ^| findstr /r /c:":{port!raw} .*LISTENING"\') do taskkill /pid %p',
  },
  listening_ports: {
    busybox: 'netstat -tulpn',
    pwsh: { win: 'Get-NetTCPConnection -State Listen | Sort-Object LocalPort' },
    cmd: 'netstat -ano | findstr LISTENING',
  },
  process_on_port: {
    busybox: "netstat -tulpn | grep ':{port!raw} '",
    pwsh: { win: "Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess, @{ Name = 'Process'; Expression = { (Get-Process -Id $_.OwningProcess).ProcessName } }" },
    cmd: 'netstat -ano | findstr :{port!raw}',
  },
  established_connections: {
    busybox: 'netstat -tun | grep ESTABLISHED',
    pwsh: { win: 'Get-NetTCPConnection -State Established' },
    cmd: 'netstat -an | findstr ESTABLISHED',
  },
  process_tree: {
    busybox: 'ps -o pid,ppid,user,args',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Process | Sort-Object ParentProcessId | Select-Object ProcessId, ParentProcessId, Name' },
    gaps: { cmd: 'tasklist has no parent PID (wmic is deprecated)' },
  },

  // ---------- system ----------
  system_info: {
    pwsh: { win: `${PS_OS} | Select-Object CSName, Caption, Version, BuildNumber, OSArchitecture`, unix: 'uname -a' },
    cmd: 'systeminfo',
  },
  os_release: {
    pwsh: { win: `${PS_OS} | Select-Object Caption, Version, BuildNumber` },
    cmd: 'ver',
  },
  kernel_version: {
    pwsh: { win: '[System.Environment]::OSVersion.Version', unix: 'uname -r' },
    cmd: 'ver',
  },
  memory_usage: {
    pwsh: { win: `${PS_OS} | Select-Object @{ Name = 'TotalGB'; Expression = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ Name = 'FreeGB'; Expression = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }` },
    cmd: 'systeminfo | findstr /c:"Physical Memory"',
  },
  cpu_info: {
    busybox: 'cat /proc/cpuinfo',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed' },
    cmd: 'echo %PROCESSOR_IDENTIFIER% & echo %NUMBER_OF_PROCESSORS%',
  },
  cpu_cores: {
    pwsh: '[System.Environment]::ProcessorCount',
    cmd: 'echo %NUMBER_OF_PROCESSORS%',
  },
  uptime: {
    pwsh: { win: `(Get-Date) - (${PS_OS}).LastBootUpTime`, unix: 'uptime' },
    cmd: 'systeminfo | findstr /c:"Boot Time"',
  },
  hostname: {
    pwsh: 'hostname',
    cmd: 'hostname',
  },
  whoami: {
    pwsh: 'whoami',
    cmd: 'whoami',
  },
  users_logged_in: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object UserName', unix: 'who' },
    cmd: 'query user',
  },
  last_logins: {
    bsd: 'last | head -n {count!raw}',
    busybox: 'last | head -n {count!raw}',
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'Security'; Id = 4624 } -MaxEvents {count!raw}", unix: 'last -n {count!raw}' },
    gaps: { cmd: 'logon events need wevtutil with an XPath query on the Security log (admin)' },
  },
  env_vars: {
    pwsh: 'Get-ChildItem -Path Env: | Sort-Object Name',
    cmd: 'set',
  },
  env_var_get: {
    pwsh: '$env:{var!raw}',
    cmd: 'echo %{var!raw}%',
  },
  which_cmd: {
    pwsh: 'Get-Command -Name {cmd} -CommandType Application -All | Select-Object -ExpandProperty Source',
    cmd: 'where {cmd}',
  },
  show_path: {
    fish: 'string join \\n $PATH',
    pwsh: '$env:PATH -split [System.IO.Path]::PathSeparator',
    cmd: 'echo %PATH:;=&echo.%',
  },
  history_search: {
    busybox: 'grep -i -- {pattern} "${HISTFILE:-$HOME/.ash_history}"',
    fish: 'history search --contains -- {pattern}',
    pwsh: 'Select-String -LiteralPath (Get-PSReadLineOption).HistorySavePath -Pattern {pattern}',
    cmd: 'doskey /history | findstr /i /c:{pattern}',
  },
  date_time: {
    pwsh: 'Get-Date',
    cmd: 'echo %DATE% %TIME%',
  },
  timezone: {
    pwsh: 'Get-TimeZone',
    cmd: 'tzutil /g',
  },
  calendar: {
    pwsh: { unix: 'cal' },
    gaps: { pwsh: 'Windows: no built-in calendar command', cmd: 'no built-in calendar command' },
  },
  cron_list: {
    pwsh: { win: "Get-ScheduledTask -TaskPath '\\'", unix: 'crontab -l' },
    cmd: 'schtasks /query',
  },
  cron_edit: {
    pwsh: { win: 'taskschd.msc', unix: 'crontab -e' },
    cmd: 'taskschd.msc',
  },
  journal_service: {
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Like ('*' + {service} + '*')«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
    gaps: { cmd: 'wevtutil cannot filter events by message text' },
  },
  journal_errors: {
    pwsh: { win: `Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 1, 2; StartTime = (${PS_OS}).LastBootUpTime } -MaxEvents {count!raw} -ErrorAction SilentlyContinue` },
    cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:{count!raw} /rd:true /f:text',
  },
  service_status: {
    pwsh: { win: 'Get-Service -Name {service}' },
    cmd: 'sc query {service}',
  },
  service_restart: {
    pwsh: { win: 'Restart-Service -Name {service}' },
    cmd: 'net stop {service} && net start {service}',
  },
  service_stop: {
    pwsh: { win: 'Stop-Service -Name {service}' },
    cmd: 'net stop {service}',
  },
  service_start: {
    pwsh: { win: 'Start-Service -Name {service}' },
    cmd: 'net start {service}',
  },
  service_enable: {
    bsd: 'brew services start {service}',
    pwsh: { win: 'Set-Service -Name {service} -StartupType Automatic; Start-Service -Name {service}' },
    cmd: 'sc config {service} start= auto && net start {service}',
  },
  list_services: {
    pwsh: { win: "Get-Service | Where-Object Status -EQ 'Running'" },
    cmd: 'net start',
  },
  failed_services: {
    bsd: "launchctl list | awk 'NR == 1 || ($2 != \"0\" && $2 != \"-\")'",
    pwsh: { win: "Get-CimInstance -ClassName Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object Name, State, ExitCode" },
    gaps: { cmd: 'sc query cannot filter by start mode' },
  },
  dmesg: {
    pwsh: { win: 'Get-WinEvent -LogName System -MaxEvents {count!raw}', unix: 'sudo dmesg | tail -n {count!raw}' },
    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
  },
  battery: {
    fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
      ? 'pmset -g batt'
      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i (upower -e | grep -m1 BAT); end'),
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Battery | Select-Object Name, EstimatedChargeRemaining, BatteryStatus' },
    gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
  },
  temperature: {
    pwsh: { win: "Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature | Select-Object InstanceName, @{ Name = 'Celsius'; Expression = { $_.CurrentTemperature / 10 - 273.15 } }" },
    gaps: { cmd: 'no temperature sensors access from cmd.exe' },
  },
  gpu_info: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM' },
    gaps: { cmd: 'wmic is deprecated; dxdiag only writes a report file' },
  },
  usb_devices: {
    pwsh: { win: "Get-PnpDevice -PresentOnly | Where-Object InstanceId -Like 'USB*'" },
    gaps: { cmd: 'no reliable USB device listing in cmd.exe (pnputil output varies by build)' },
  },
  install_package: {
    pwsh: { win: 'winget install {pkg}' },
    cmd: 'winget install {pkg}',
  },
  package_installed: {
    pwsh: { win: 'winget list {pkg}' },
    cmd: 'winget list {pkg}',
  },
  system_update: {
    pwsh: { win: 'winget upgrade --all' },
    cmd: 'winget upgrade --all',
  },

  // ---------- network ----------
  ip_addresses: {
    busybox: 'ip -o addr show',
    pwsh: { win: 'Get-NetIPAddress | Select-Object InterfaceAlias, AddressFamily, IPAddress, PrefixLength' },
    cmd: 'ipconfig',
  },
  public_ip: {
    pwsh: "Invoke-RestMethod -Uri 'https://ifconfig.me/ip'",
    cmd: 'curl -s https://ifconfig.me & echo.',
  },
  ping_host: {
    pwsh: 'Test-Connection -ComputerName {host} -Count {count!raw}',
    cmd: 'ping -n {count!raw} {host}',
  },
  dns_lookup: {
    busybox: 'nslookup {host}',
    pwsh: { win: 'Resolve-DnsName -Name {host}', unix: 'dig +short {host}' },
    cmd: 'nslookup {host}',
  },
  traceroute: {
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -TraceRoute', unix: 'traceroute {host}' },
    cmd: 'tracert {host}',
  },
  routes: {
    pwsh: { win: 'Get-NetRoute' },
    cmd: 'route print',
  },
  port_check: {
    busybox: 'nc -w 3 {host} {port!raw} </dev/null && echo open || echo closed',
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -Port {port!raw}', unix: 'nc -zv {host} {port!raw}' },
    gaps: { cmd: 'no TCP port probe in cmd.exe (telnet client is not installed by default)' },
  },
  curl_headers: {
    // Windows PowerShell 5.1 aliases curl to Invoke-WebRequest, so call curl.exe explicitly.
    pwsh: { win: 'curl.exe -sI {url}', unix: 'curl -sI {url}' },
    cmd: 'curl -sI {url}',
  },
  http_status: {
    pwsh: { win: "curl.exe -s -o NUL -w '%{http_code}\\n' {url}", unix: "curl -s -o /dev/null -w '%{http_code}\\n' {url}" },
    cmd: 'curl -s -o NUL -w "%{http_code}\\n" {url}',
  },
  download_file: {
    pwsh: { win: 'curl.exe -fLO {url}', unix: 'curl -fLO {url}' },
    cmd: 'curl -fLO {url}',
  },
  ssh_connect: {
    pwsh: 'ssh {target}',
    cmd: 'ssh {target}',
  },

  // ---------- git ----------
  git_status: { pwsh: 'git status', cmd: 'git status' },
  git_log: {
    pwsh: 'git log --oneline --graph --decorate -n {count!raw}',
    cmd: 'git log --oneline --graph --decorate -n {count!raw}',
  },
  git_diff: {
    // a bare `--` can be swallowed by PowerShell before reaching native commands; quote it
    pwsh: "git diff«'--' {file}»",
    cmd: 'git diff«-- {file}»',
  },
  git_diff_staged: { pwsh: 'git diff --staged', cmd: 'git diff --staged' },
  git_branches: { pwsh: 'git branch -a', cmd: 'git branch -a' },
  git_current_branch: { pwsh: 'git branch --show-current', cmd: 'git branch --show-current' },
  git_new_branch: { pwsh: 'git checkout -b {branch}', cmd: 'git checkout -b {branch}' },
  git_switch_branch: { pwsh: 'git checkout {branch}', cmd: 'git checkout {branch}' },
  git_delete_branch: { pwsh: 'git branch -d {branch}', cmd: 'git branch -d {branch}' },
  git_undo_commit: { pwsh: 'git reset --soft HEAD~1', cmd: 'git reset --soft HEAD~1' },
  git_discard_changes: { pwsh: 'git restore«{file}»', cmd: 'git restore«{file}»' },
  git_stash: { pwsh: 'git stash', cmd: 'git stash' },
  git_stash_pop: { pwsh: 'git stash pop', cmd: 'git stash pop' },
  git_pull: { pwsh: 'git pull', cmd: 'git pull' },
  git_push: { pwsh: 'git push«origin {branch}»', cmd: 'git push«origin {branch}»' },
  git_clone: { pwsh: 'git clone {url}', cmd: 'git clone {url}' },
  git_add_all: { pwsh: 'git add -A', cmd: 'git add -A' },
  git_commit: {
    // `&&` needs PowerShell 7+; this form also works in Windows PowerShell 5.1
    pwsh: 'git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }',
    cmd: 'git add -A && git commit -m {message}',
  },
  git_remote: { pwsh: 'git remote -v', cmd: 'git remote -v' },
  git_blame: { pwsh: 'git blame {file}', cmd: 'git blame {file}' },
  git_init: { pwsh: 'git init', cmd: 'git init' },

  // ---------- docker ----------
  docker_ps: { pwsh: 'docker ps', cmd: 'docker ps' },
  docker_ps_all: { pwsh: 'docker ps -a', cmd: 'docker ps -a' },
  docker_logs: {
    pwsh: 'docker logs --tail {count!raw} -f {container}',
    cmd: 'docker logs --tail {count!raw} -f {container}',
  },
  docker_images: { pwsh: 'docker images', cmd: 'docker images' },
  docker_stop: { pwsh: 'docker stop {container}', cmd: 'docker stop {container}' },
  docker_stop_all: {
    fish: 'docker stop (docker ps -q)',
    pwsh: 'docker stop (docker ps -q)',
    cmd: "for /f %i in ('docker ps -q') do docker stop %i",
  },
  docker_prune: { pwsh: 'docker system prune -a', cmd: 'docker system prune -a' },
  docker_exec: { pwsh: 'docker exec -it {container} sh', cmd: 'docker exec -it {container} sh' },
  docker_stats: { pwsh: 'docker stats --no-stream', cmd: 'docker stats --no-stream' },
  docker_compose_up: { pwsh: 'docker compose up -d', cmd: 'docker compose up -d' },
  docker_compose_down: { pwsh: 'docker compose down', cmd: 'docker compose down' },
};
