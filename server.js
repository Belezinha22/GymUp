import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleAiChatRequest } from './server/aiChat.js';

const rootDir = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(rootDir, 'dist');
const envFile = resolve(rootDir, '.env');
const localEnv = await readEnvFile(envFile);
const config = {
  baseUrl: (process.env.OLLAMA_BASE_URL || localEnv.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, ''),
  model: process.env.OLLAMA_MODEL || localEnv.OLLAMA_MODEL || 'qwen3:4b-instruct',
};
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = createServer(async (request, response) => {
  try {
    if (await handleAiChatRequest(request, response, config)) return;
    await serveApp(request, response);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Não foi possível abrir esta página.');
  }
});

async function serveApp(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  const rawPath = new URL(request.url, 'http://localhost').pathname;
  let pathname;
  try {
    pathname = decodeURIComponent(rawPath);
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }

  let target = resolve(distDir, `.${pathname}`);
  if (!target.startsWith(`${distDir}${sep}`) && target !== distDir) {
    response.writeHead(403);
    response.end();
    return;
  }

  try {
    if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
    await stat(target);
  } catch {
    target = resolve(distDir, 'index.html');
  }

  const file = await readFile(target);
  response.writeHead(200, {
    'Content-Type': contentTypes[extname(target).toLowerCase()] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(request.method === 'HEAD' ? undefined : file);
}

async function readEnvFile(path) {
  try {
    const contents = await readFile(path, 'utf8');
    return Object.fromEntries(contents.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || match[1].startsWith('#')) return [];
      const value = match[2].replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
      return [[match[1], value]];
    }));
  } catch {
    return {};
  }
}

const port = Number(process.env.PORT || localEnv.PORT || 4173);
server.listen(port, '0.0.0.0', () => {
  console.log(`GymUp disponível em http://localhost:${port}`);
  console.log(`Assistente local: ${config.model} em ${config.baseUrl}`);
});
