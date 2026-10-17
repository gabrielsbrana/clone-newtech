import { randomBytes, scryptSync } from 'node:crypto';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const filename = '.admin-credentials.local';
if (!existsSync(filename)) {
  const password = randomBytes(24).toString('base64url');
  const salt = randomBytes(16).toString('hex');
  const passwordHash = `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
  const sessionSecret = randomBytes(48).toString('base64url');
  writeFileSync(filename, JSON.stringify({ route: '/gestao-newtech', password, ADMIN_PASSWORD_HASH: passwordHash, ADMIN_SESSION_SECRET: sessionSecret }, null, 2), { mode: 0o600 });
}
if (process.argv.includes('--vercel')) {
  const credentials = JSON.parse(readFileSync(filename, 'utf8'));
  for (const name of ['ADMIN_PASSWORD_HASH', 'ADMIN_SESSION_SECRET']) {
    const result = spawnSync(process.platform === 'win32' ? 'vercel.cmd' : 'vercel', ['env', 'add', name, 'production'], { input: credentials[name], encoding: 'utf8', shell: process.platform === 'win32', stdio: ['pipe', 'pipe', 'pipe'] });
    if (result.status !== 0) { console.error(`Falha ao configurar ${name}: ${result.stderr || result.stdout}`); process.exit(1); }
    console.log(`${name} configurado em Production.`);
  }
}
console.log(`Acesso administrativo salvo em ${filename}. Não publique esse arquivo.`);
