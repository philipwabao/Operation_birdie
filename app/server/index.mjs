import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { handlePreviewTrace, handlePreviewValidate, isPreviewRoute } from './preview-auth.mjs';

const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST;
const distDir = path.resolve(process.cwd(), 'dist');

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
]);

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.statusCode = 400;
    res.end();
    return;
  }

  if (isPreviewRoute(req)) {
    if (req.url?.startsWith('/api/preview/trace')) {
      await handlePreviewTrace(req, res);
      return;
    }
    await handlePreviewValidate(req, res);
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';

  const resolvedPath = path.resolve(distDir, `.${pathname}`);
  if (!resolvedPath.startsWith(distDir)) {
    res.statusCode = 403;
    res.end();
    return;
  }

  const looksLikeFile = path.extname(pathname) !== '';
  let filePath = resolvedPath;

  if (!(await fileExists(filePath))) {
    if (looksLikeFile) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    filePath = path.join(distDir, 'index.html');
  }

  try {
    const data = await fs.readFile(filePath);
    const contentType = mimeTypes.get(path.extname(filePath)) ?? 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const listen = (callback) => (host ? server.listen(port, host, callback) : server.listen(port, callback));
listen(() => {
  const shownHost = host ?? 'localhost';
  console.log(`Preview server running at http://${shownHost}:${port}`);
});
