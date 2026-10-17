// Gate step 3, strict cue coverage for git ops (split from strict_cover.js; docs/ir_error_taxonomy_v4.md fix 9).
// Same rule fields and key forms as strict_cover.js COVER_RULES; the custom checks get the cover context plus
// its `has(key)` helper. Tuned on v4 train gold.

const REMOTE = ['remote', 'remotes', 'remote-tracking'];
const ALL_BRANCHES = ['local', 'all branches', 'every branch', 'all the branches', 'including remote', 'including remotes',
  'remote too', 'remotes too', 'remote ones too', 'local and remote', 'remote and local', 'plus remote', 'plus remotes',
  'and remote', 'and remotes', 'both', 'with remotes', 'with remote', 'as well', 'included', 'including', 'incl', 'include'];
const NOT_LOCAL = ['nothing local', 'no local', 'not local', 'without local', 'not the local', 'only remote', 'only the remote', 'remote only', 'remotes only', 'just remote', 'just the remote'];
const NAME_STATUS = ['git.log.name_status', 'git.show.name_status', 'git.diff.name_status'];

export const GIT_COVER_RULES = [
  // git log format / dates
  { id: 'log_hash_subject', words: ['hash and subject', 'hashes and subjects', 'hash and message', 'hashes and messages',
    'sha and subject', 'shas and subjects', 'hash and title', 'hashes and titles', 'sha and message', 'shas and messages'],
  when: ['git.log'], need: ['git.log.format=hash_subject', 'git.log.oneline'] },
  { id: 'log_subject_only', words: ['subjects only', 'only subjects', 'just subjects', 'just the subjects', 'only the subjects',
    'subject lines only', 'only subject lines', 'just subject lines', 'just the subject lines', 'only the subject lines',
    'just the subject', 'only the subject', 'without hashes', 'no hashes', 'without the hash', 'no hash',
    'subject only', 'subject-only', 'commit subjects', 'subjects of', 'just their subjects'],
  when: ['git.log'], unless: ['hash', 'hashes', 'sha', 'shas', 'oneline', 'one-line', 'one line', 'matching', 'containing', 'mentioning', 'whose', 'grep',
    'starting', 'starts', 'start', 'search', 'for'],
  need: ['git.log.format=subject'], forbid: ['git.log.format=hash_subject'] },
  { id: 'log_fuller', words: ['fuller', 'committer', 'committers'], when: ['git.log'], need: ['git.log.format=fuller'] },
  { id: 'log_author_date', words: ['author and date', 'authors and dates', 'date and author', 'dates and authors',
    'with author', 'with authors', 'with the author', 'with dates', 'with the date', 'with date', 'who and when', 'with their author',
    'and author', 'and authors', 'and date', 'and dates', 'author, date', 'authors, dates'],
  when: ['git.log'], forbid: ['git.log.oneline', 'git.log.format=subject', 'git.log.format=hash_subject'] },
  { id: 'log_relative', words: ['relative date', 'relative dates', 'relative time', 'relative times', 'how long ago', 'relative'],
    when: ['git.log'], need: ['git.log.date_format=relative'] },
  { id: 'log_iso', words: ['iso', 'iso-8601', 'iso8601', 'iso 8601'], when: ['git.log'], need: ['git.log.date_format=iso'] },
  { id: 'log_short_date', words: ['short date', 'short dates', 'short-date', 'short-dates'], when: ['git.log'], need: ['git.log.date_format=short'] },
  { id: 'log_until', words: ['until', 'up until', 'till'], when: ['git.log'], need: ['git.log.until'] },
  { id: 'log_patch', words: ['with patches', 'with patch', 'with the patch', 'with diffs', 'with the diffs', 'with the diff',
    'with diff', 'including diffs', 'including the diff', 'including patches', 'plus the diff', 'plus diffs', 'and their diffs',
    'and the diffs', 'and patches', 'patch of', 'patches of', 'patches', 'full diffs', 'patch output', 'full patch', 'full patches'],
  when: ['git.log'], need: ['git.log.patch', 'git.log.stat'] },
  { id: 'git_stat', words: ['diffstat', 'stat', 'stats', 'with stats', 'insertions', 'deletions'], when: ['git.log', 'git.show', 'git.diff'],
    need: ['git.log.stat', 'git.show.stat', 'git.diff.stat'] },
  { id: 'git_name_only', words: ['names only', 'only the names', 'only names', 'just the names', 'just names', 'filenames only',
    'only filenames', 'just filenames', 'just the filenames', 'only the filenames', 'file names only', 'just the file names',
    'only the file names', 'only file names', 'just file names', 'name-only', 'name only', 'file list', 'list the files', 'list files',
    'files staged', 'unstaged names', 'staged names', 'which files did', 'files they changed', 'files each commit changed',
    'with file names', 'with filenames', 'name lists', 'file names', 'filenames'],
  when: ['git.log', 'git.show', 'git.diff'], unless: ['patch', 'patches', 'diff of', 'content', 'contents', 'stat', 'stats', 'diffstat'],
  need: ['git.log.name_only', 'git.show.name_only', 'git.diff.name_only', ...NAME_STATUS] },
  { id: 'git_name_status', words: ['name-status', 'name status', 'name and status', 'names and status', 'names and statuses'],
    when: ['git.log', 'git.show', 'git.diff'], need: NAME_STATUS },
  { id: 'word_diff', words: ['word-level', 'word level', 'word diff', 'word-diff', 'word by word', 'word-by-word'], when: ['git.diff'],
    need: ['git.diff.word_diff'] },
  { id: 'diff_staged', words: ['staged', 'cached', 'in the index', 'index', 'of the index', 'index diff'], when: ['git.diff'],
    unless: ['unstaged', 'not staged', 'uncommitted', 'and staged', 'staged and', 'or staged', 'not yet staged', "haven't staged", 'not been staged', 'before staging'],
    need: ['git.diff.staged'] },
  { id: 'log_decorate', words: ['decorate', 'decorated', 'decorations', 'branch labels', 'with labels', 'ref names', 'with refs', 'tag labels'],
    when: ['git.log'], need: ['git.log.decorate'] },
  { id: 'log_graph', words: ['graph', 'as a graph', 'ascii graph'], when: ['git.log'], need: ['git.log.graph'] },
  // show vs diff
  { id: 'show_vs', words: ['vs', 'versus', 'compared to', 'compared with', 'working tree', 'work tree', 'against', 'relative to'], when: ['git.show'], unless: ['parent', 'its parent', 'previous commit'],
    forbid: ['git.show'] },
  // git status
  { id: 'status_short', words: ['short', 'brief', 'compact', 'concise', 'short format', 'short form'], when: ['git.status'],
    unless: ['porcelain', 'machine', 'machine-readable'], need: ['git.status.short', 'git.status.porcelain'] },
  { id: 'status_branch', words: ['branch info', 'branch line', 'branch header', 'with branch', 'with the branch', 'tracking info',
    'ahead', 'behind', 'and branch', 'plus branch', 'branch name', 'branch and', 'tracking', 'including branch', 'including the branch'],
  when: ['git.status'], need: ['git.status.branch'] },
  { id: 'status_porcelain', words: ['porcelain', 'machine-readable', 'machine readable', 'script-friendly', 'parseable', 'parsable'],
    when: ['git.status'], need: ['git.status.porcelain'] },
  // branches
  { id: 'branch_current', words: ['current branch', 'branch am i on', "branch i'm on", 'branch i am on', 'active branch',
    'checked out branch', 'checked-out branch', 'branch is checked out', 'current git branch'],
  when: ['git.branch'], unless: ['all', 'every', 'branches', 'other', 'others'], need: ['git.branch.show_current'] },
  // the question forms ask for the branch name whatever op was predicted
  { id: 'branch_current', words: ['which branch am i on', 'what branch am i on', 'what branch is checked out', 'which branch is checked out'],
    unless: ['all', 'every', 'branches', 'commits', 'log', 'history', 'diff'], need: ['git.branch.show_current', 'git.status.branch'] },
  { id: 'branch_tracking', words: ['tracking info', 'tracking information', 'tracking branch', 'tracking branches', 'upstream', 'upstreams',
    'their upstream', 'remote-tracking branch', 'what they track', 'which remote', 'tracked branch', 'tracking'], when: ['git.branch'],
  unless: ['remote tracking', 'remote-tracking', 'remote branches'], need: ['git.branch.very_verbose'] },
  { id: 'branch_verbose', words: ['commit info', 'commit subjects', 'with commit', 'last commit', 'latest commit', 'with their last commit',
    'commit subject', 'with hashes', 'with the hash', 'with sha', 'last commits'], when: ['git.branch'],
  need: ['git.branch.verbose', 'git.branch.very_verbose'] },
  { id: 'branch_merged', words: ['merged into', 'already merged', 'been merged', 'fully merged'], when: ['git.branch'],
    unless: ['not merged', 'unmerged', 'not yet merged', "haven't been merged", 'not been merged', "aren't merged", 'not fully merged'],
    need: ['git.branch.merged'] },
  { id: 'branch_no_merged', words: ['not merged', 'unmerged', 'not yet merged', "haven't been merged", 'not been merged', "aren't merged"],
    when: ['git.branch'], need: ['git.branch.no_merged'] },
];

// custom git checks: hash+subject in any order, bare subjects, "older than / before <time>", branch -a/-r, message grep
export function gitCoverObligations(cx, has) {
  const { words, fail, hasFree, execInfos, ops, consumed } = cx;
  const free = (i) => i >= 0 && i < words.length && !consumed.has(i);

  if (ops.has('git.log')) {
    // "hash and subject", "subjects with hashes", "sha + subject": hash/sha and subject within 4 words
    const HASH = new Set(['hash', 'hashes', 'sha', 'shas', 'sha1']);
    const SUBJ = new Set(['subject', 'subjects']);
    const hashSubj = words.some((w, i) => free(i) && HASH.has(w)
      && words.slice(Math.max(0, i - 4), i + 5).some((x, k) => SUBJ.has(x) && free(Math.max(0, i - 4) + k)));
    if (hashSubj && !hasFree(['author', 'authors', 'date', 'dates', 'without hashes', 'no hashes', 'no hash', 'without the hash'])
      && !has('git.log.format=hash_subject') && !has('git.log.oneline')) fail('cover', '"hash and subject" needs --format=%h %s or --oneline [log_hash_subject]');
    // a bare "subject(s)" with no hash / sha / oneline word and not a message filter ("whose subject ...")
    const s = words.findIndex((w, i) => free(i) && SUBJ.has(w));
    if (s >= 0 && !hashSubj && !hasFree(['oneline', 'one-line', 'one line', 'hash', 'hashes', 'sha', 'shas', 'author', 'authors', 'date', 'dates', 'whose',
      'containing', 'contains', 'contain', 'mentioning', 'mention', 'mentions', 'matching', 'match', 'matches', 'grep', 'with', 'in the subject',
      'in their subject', 'starts', 'starting', 'start', 'begins', 'beginning', 'ends', 'ending', 'says', 'saying', 'has', 'have', 'like', 'about', 'full', 'body'])
      && !['whose', 'the', 'in', 'by'].includes(words[s - 1])
      && !has('git.log.format=subject')) fail('cover', `"${words[s]}" needs --format=%s [log_subject_only]`);
    // "older than 2 weeks", "before 2024-01-01", "prior to last monday": the upper date bound, not --since
    const TIME = /^(\d|yesterday|today|last|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|a$|an$|one$|two$|three$|four$|five$|six$|ten$)/;
    const BEFORE = [['older', 'than'], ['prior', 'to'], ['earlier', 'than'], ['before']];
    for (const p of BEFORE) {
      const i = words.findIndex((_, k) => p.every((x, j) => words[k + j] === x && free(k + j)));
      if (i < 0) continue;
      let j = i + p.length;
      if (words[j] === 'the') j++;
      if (!TIME.test(String(words[j] || ''))) continue;
      if (hasFree(['since', 'after', 'between', 'from', 'newer than'])) continue;
      if (!has('git.log.until') || has('git.log.since')) fail('cover', `"${p.join(' ')} ${words[j]}" needs --until and no --since [log_until]`);
      break;
    }
    // message grep: "both X and Y" ANDs two --grep values; "doesn't mention X" inverts it
    for (const info of execInfos) {
      if (info.exec.op !== 'git.log') continue;
      const gm = info.modValues.grep_message || [];
      const hasM = (m) => info.exec.mods.some((x) => x.mod === m);
      if (gm.length >= 2 && hasFree(['both', 'all of']) && !hasM('all_match')) fail('cover', '"both X and Y" needs --all-match [all_match]');
      if (gm.length && hasFree(["doesn't contain", 'does not contain', "doesn't mention", 'does not mention', "don't mention", 'do not mention',
        "don't contain", 'do not contain', 'not mentioning', 'not containing', 'lacking', "doesn't include", 'does not include']) && !hasM('invert_grep'))
        fail('cover', '"doesn\'t mention X" needs --invert-grep [invert_grep]');
    }
  }

  // git branch: "remote branches" is -r; "all / local and remote branches" is -a
  if (ops.has('git.branch')) {
    const remote = hasFree(['no remotes', 'no remote', 'not remote', 'without remotes', 'without remote', 'excluding remotes', 'local only', 'only local'])
      ? undefined : hasFree(REMOTE);
    const allCue = remote && hasFree(ALL_BRANCHES);
    const notLocal = hasFree(NOT_LOCAL);
    if (remote && !allCue && has('git.branch.all') && !has('git.branch.remotes')) fail('cover', '"remote branches" is git branch -r; -a also lists local ones [branch_remote]');
    if (allCue && !notLocal && has('git.branch.remotes') && !has('git.branch.all')) fail('cover', `"${allCue}" needs git branch -a, -r lists only remote ones [branch_all]`);
    if ((allCue || remote) && !has('git.branch.all') && !has('git.branch.remotes') && !has('git.branch.very_verbose'))
      fail('cover', `"${allCue || remote}" needs git branch -a or -r [branch_all]`);
  }
}
