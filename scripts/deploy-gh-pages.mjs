import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');

let owner = process.env.GH_OWNER;
let repo = process.env.GH_REPO;
const branch = process.env.GH_PAGES_BRANCH || 'gh-pages';
const token = process.env.GH_TOKEN;

if (!fs.existsSync(distDir)) {
  console.error('ERRO: pasta dist/ não encontrada. Rode `npm run build` antes.');
  process.exit(1);
}

if (!owner || !repo) {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/);
    if (match) {
      owner = owner || match[1];
      repo = repo || match[2];
    }
  } catch (error) {
    // ignore and handle below
  }
}

if (!owner || !repo) {
  console.error('ERRO: defina GH_OWNER e GH_REPO nas variáveis de ambiente ou configure remote.origin.url no Git.');
  process.exit(1);
}

// Instalação temporária do package para fazer publish (mantém repo sem dependências extras).
execSync('npm i -D gh-pages --silent', { stdio: 'inherit' });

const repoUrl = token
  ? `https://${token}@github.com/${owner}/${repo}.git`
  : `https://github.com/${owner}/${repo}.git`;

// Executa o deploy.
execSync(
  [
    'npx gh-pages',
    '--dist dist',
    `--branch ${branch}`,
    '--repo ' + repoUrl,
    '--dotfiles',
  ].join(' '),
  { stdio: 'inherit' }
);

console.log('Deploy enviado com sucesso para o GitHub Pages.');

