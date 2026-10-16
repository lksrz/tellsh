// Built-in value vocabulary for grok_gen.mjs: each generator call samples a fresh subset
// (seeded by call index) so requests stop converging on src/, README, TODO, app.log.
// Pure data + a sampler; no dependencies.

const stems = ['server', 'client', 'index', 'main', 'utils', 'helpers', 'config', 'settings', 'router', 'routes', 'handler',
  'middleware', 'auth', 'session', 'billing', 'invoice', 'payment', 'checkout', 'cart', 'order', 'user_service', 'userService',
  'api_client', 'db', 'database', 'schema', 'models', 'migrations', 'seed', 'worker', 'scheduler', 'cron_jobs', 'queue',
  'consumer', 'producer', 'logger', 'metrics', 'telemetry', 'cache', 'redis_client', 'mailer', 'notifications', 'webhook',
  'parser', 'lexer', 'tokenizer', 'compiler', 'renderer', 'layout', 'theme', 'store', 'reducer', 'actions', 'selectors',
  'hooks', 'useAuth', 'useFetch', 'Button', 'Modal', 'NavBar', 'Dashboard', 'Sidebar', 'LoginForm', 'ProfilePage', 'app',
  'bootstrap', 'setup', 'deploy', 'build', 'release', 'Makefile', 'Dockerfile', 'docker-compose', 'Jenkinsfile', 'conftest',
  'test_helpers', 'fixtures', 'factory', 'serializer', 'views', 'urls', 'admin', 'tasks', 'celery', 'pipeline', 'train',
  'evaluate', 'preprocess', 'dataset', 'loader', 'feature_flags', 'rate_limiter', 'retry', 'backoff', 'crypto', 'jwt',
  'oauth', 'permissions', 'roles', 'audit', 'export', 'import_csv', 'report', 'search_index', 'geo', 'i18n', 'locale'];
const exts = ['ts', 'tsx', 'js', 'jsx', 'mjs', 'py', 'go', 'rs', 'java', 'kt', 'rb', 'php', 'c', 'h', 'cpp', 'hpp', 'cs',
  'swift', 'scala', 'sh', 'yaml', 'yml', 'toml', 'json', 'ini', 'conf', 'sql', 'md', 'rst', 'txt', 'csv', 'xml', 'html',
  'css', 'scss', 'vue', 'svelte', 'tf', 'proto', 'gradle', 'lua', 'ex', 'dart'];
const specialFiles = ['package.json', 'tsconfig.json', 'go.mod', 'Cargo.toml', 'pyproject.toml', 'requirements.txt',
  'Gemfile', 'composer.json', 'pom.xml', 'build.gradle', '.env.example', '.gitignore', '.eslintrc.json', 'CHANGELOG.md',
  'CONTRIBUTING.md', 'LICENSE', 'nginx.conf', 'values.yaml', 'main.tf', 'variables.tf', 'docker-compose.yml', 'Procfile',
  'access.log', 'error.log', 'worker.log', 'debug.log', 'server.log', 'build.log', 'syslog', 'audit.log', 'cron.log',
  'gc.log', 'deploy.log', 'test-results.xml', 'coverage.xml', 'yarn.lock', 'pnpm-lock.yaml', 'poetry.lock'];
const dirs = ['lib', 'app', 'pkg', 'cmd/server', 'internal/auth', 'internal/db', 'services/billing', 'services/api/handlers',
  'packages/web/src', 'packages/core/lib', 'apps/admin/pages', 'components/forms', 'src/components/ui', 'src/hooks',
  'backend/app/models', 'frontend/src/views', 'api/v2', 'scripts', 'tools/codegen', 'config', 'deploy/k8s', 'infra/terraform',
  'ansible/roles/web', 'migrations', 'db/seeds', 'tests/unit', 'tests/integration', 'spec/models', 'e2e', 'test/fixtures',
  'notebooks', 'data/raw', 'data/processed', 'models/checkpoints', 'logs', 'var/log/nginx', '/var/log', '/etc/nginx',
  'tmp', 'build', 'dist', 'out', 'target/debug', 'vendor', 'third_party', 'docs/guides', 'docs/api', 'assets/images',
  'public/static', 'templates/email', 'locales/en', 'plugins', 'modules/payments', 'crates/core/src', 'include', 'bench',
  'examples', 'ci', '.github/workflows', 'charts/app/templates', '~/projects/website', '~/.config/nvim', '~/Downloads',
  '~/notes', '~/work/api-gateway', '~/dotfiles'];
const languages = ['python', 'typescript', 'javascript', 'go', 'rust', 'java', 'kotlin', 'ruby', 'php', 'c', 'c++', 'shell',
  'yaml', 'markdown', 'sql', 'html', 'css', 'terraform', 'swift', 'scala', 'lua', 'elixir', 'protobuf'];
const identifiers = ['getUserById', 'fetchOrders', 'handleSubmit', 'parseConfig', 'validateToken', 'createSession',
  'renderHeader', 'computeTotal', 'retryCount', 'maxConnections', 'isEnabled', 'onClick', 'useEffect', 'setTimeout',
  'process_payment', 'load_dataset', 'send_email', 'get_db', 'build_query', 'parse_args', 'run_migrations', 'user_id',
  'created_at', 'api_key', 'MAX_RETRIES', 'DEFAULT_TIMEOUT', 'BASE_URL', 'DATABASE_URL', 'FEATURE_NEW_CHECKOUT',
  'OrderService', 'PaymentGateway', 'HttpClient', 'UserRepository', 'NotFoundError', 'ValidationError', 'ctx.Done',
  'http.HandleFunc', 'unwrap()', 'console.log', 'print(', 'logger.debug', 'panic(', 'deprecated', 'legacyMode',
  'tenant_id', 'invoiceNumber', 'webhookSecret', 'shouldRetry', 'cacheKey', 'serialize', 'deserialize'];
const errorStrings = ['connection refused', 'timeout exceeded', 'permission denied', 'out of memory', 'segmentation fault',
  'NullPointerException', 'TypeError', 'KeyError', 'undefined is not a function', 'ECONNRESET', 'EADDRINUSE',
  'deadlock detected', 'failed to connect', 'invalid token', 'status 500', '502 Bad Gateway', 'too many open files',
  'stack overflow', 'disk full', 'certificate expired', 'no such host', 'broken pipe', 'unhandled rejection'];
const logLevels = ['ERROR', 'WARN', 'WARNING', 'INFO', 'DEBUG', 'FATAL', 'CRITICAL', 'TRACE', 'error', 'warn', 'panic'];
const tags = ['TODO', 'FIXME', 'XXX', 'HACK', 'NOTE', 'BUG', 'OPTIMIZE', 'REVIEW', 'DEPRECATED', '@todo', 'TODO(alice)'];
const regexes = ['^import ', 'v[0-9]+\\.[0-9]+', '[0-9]{3}-[0-9]{4}', 'func [A-Z]\\w*', '^\\s*#', 'class \\w+Error',
  'https?://', '\\bawait\\b', '^export (default )?function', 'user_[0-9]+', '[A-Z]{2,}_KEY', ' 5[0-9]{2} '];
const authors = ['alice', 'bob', 'carol', 'dave', 'erin', 'frank', 'grace', 'heidi', 'ivan', 'judy', 'mallory', 'oscar',
  'peggy', 'trent', 'victor', 'wendy', 'Jan Kowalski', 'Maria Garcia', 'Wei Chen', 'Priya Patel', 'dependabot', 'renovate'];
const branches = ['main', 'master', 'develop', 'staging', 'release/2.4', 'release/v1.9', 'feature/login', 'feat/search-v2',
  'fix/race-condition', 'hotfix/payment-timeout', 'chore/deps', 'refactor/auth', 'experiment/new-ui', 'origin/main',
  'upstream/develop'];
const revs = ['HEAD~1', 'HEAD~3', 'HEAD~10', 'v1.2.0', 'v2.0.0-rc1', 'v3.4.1', 'a1b2c3d', '9f8e7d6', '4e5f6a7', 'HEAD^'];
const urls = ['https://api.github.com/repos/acme/widget', 'https://httpbin.org/json', 'http://localhost:3000/health',
  'http://localhost:8080/api/v1/status', 'https://api.example.com/users', 'http://127.0.0.1:9200/_cluster/health',
  'https://registry.npmjs.org/express', 'https://jsonplaceholder.typicode.com/todos/1', 'http://localhost:5000/metrics',
  'https://status.example.org/api/summary.json', 'http://0.0.0.0:8000/docs', 'https://ipinfo.io/json'];
const hosts = ['localhost', '127.0.0.1', 'api.internal', 'db.staging.local', 'example.com', 'grafana.local'];
const processes = ['node', 'python', 'python3', 'java', 'nginx', 'postgres', 'redis-server', 'mongod', 'docker', 'chrome',
  'firefox', 'Slack', 'code', 'webpack', 'vite', 'gunicorn', 'uvicorn', 'celery', 'ruby', 'puma', 'sidekiq', 'php-fpm',
  'mysqld', 'kafka', 'zookeeper', 'jupyter', 'ssh', 'tmux', 'ollama', 'esbuild'];
const ports = ['3000', '3001', '4000', '5000', '5173', '5432', '6379', '8000', '8080', '8443', '8888', '9000', '9090',
  '9200', '27017', '1433', '4200', '6006', '11434'];
const jqPaths = ['.name', '.version', '.data.items', '.results[0].id', '.user.email', '.dependencies', '.scripts',
  '.status', '.items[].name', '.meta.total', '.config.port', '.tag_name', '.license', '.stargazers_count', '.title'];
const sizes = ['10k', '500 kilobytes', '1 MB', '5MB', '50 megabytes', '100M', '1 gig', '2GB', '200 kb', '20 megs'];
const ages = ['today', 'yesterday', 'the last 2 days', 'the past week', 'last 3 days', 'the last 30 days', '2 weeks',
  'more than a month', 'over 90 days', 'the last hour', 'since monday', 'a year'];
const npmScripts = ['build', 'test', 'lint', 'dev', 'start', 'typecheck', 'format', 'test:unit', 'test:e2e', 'build:prod',
  'storybook', 'migrate', 'seed', 'coverage', 'prepare', 'clean'];
const counts = ['3', '5', '7', '10', '12', '15', '20', '25', '30', '40', '50', '100', 'three', 'five', 'ten', 'twenty'];

function fileNames() {
  const out = [...specialFiles];
  for (let i = 0; i < stems.length; i++) out.push(`${stems[i]}.${exts[(i * 7) % exts.length]}`);
  return out;
}

export const POOLS = {
  files: fileNames(), dirs, exts, languages, identifiers, errorStrings, logLevels, tags, regexes, authors, branches,
  revs, urls, hosts, processes, ports, jqPaths, sizes, ages, npmScripts, counts,
};

// Sample a few values from every pool; deterministic for a given rng.
export function sampleValues(r, per = 6) {
  const out = {};
  for (const [k, xs] of Object.entries(POOLS)) {
    const take = Math.min(xs.length, k === 'files' || k === 'dirs' || k === 'identifiers' ? per * 2 : per);
    const idx = new Set(); while (idx.size < take) idx.add(Math.floor(r() * xs.length));
    out[k] = [...idx].map((i) => xs[i]);
  }
  return out;
}

export const OPENINGS = [
  'bare noun phrase ("all python files over 1MB in data/raw")', 'imperative verb other than show ("list", "grep for", "dig up", "pull up", "print", "find", "grab")',
  'question with "where" / "which" / "what"', 'first person need ("I need ...", "I want to see ...")', 'polite ("could you ...", "please ...")',
  'context first ("in the billing service, ...", "for the logs in /var/log, ...")', 'goal-oriented ("to debug the timeout, ...")',
  'terse keywords ("errors worker.log last 50")', '"is there / are there ..." question', '"give me" / "get me" ...',
  '"count" / "tally" / "number of" (stating what is counted)', '"check" / "see if" ...', 'time-anchored ("since yesterday, ...", "this week\'s ...")',
];
