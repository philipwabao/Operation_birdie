import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { handlePreviewTrace, handlePreviewValidate, isPreviewRoute } from './preview-auth.mjs';

const port = Number(process.env.PORT ?? 5173);
const host = process.env.HOST;

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const server = http.createServer((req, res) => {
  if (isPreviewRoute(req)) {
    if (req.url?.startsWith('/api/preview/trace')) {
      handlePreviewTrace(req, res);
      return;
    }
    handlePreviewValidate(req, res);
    return;
  }

  vite.middlewares(req, res, async () => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.end();
      return;
    }

    try {
      const url = req.originalUrl || req.url || '/';
      const indexPath = path.resolve(process.cwd(), 'index.html');
      const html = await fs.readFile(indexPath, 'utf-8');
      const transformed = await vite.transformIndexHtml(url, html);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(transformed);
    } catch (error) {
      res.statusCode = 500;
      res.end('Dev server error');
    }
  });
});

const listen = (callback) => (host ? server.listen(port, host, callback) : server.listen(port, callback));
listen(() => {
  const shownHost = host ?? 'localhost';
  console.log(`Preview dev server running at http://${shownHost}:${port}`);
});
