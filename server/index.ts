import path from 'path';
import { parse } from 'url';
import next from 'next';
import express from 'express';
import { PORT, NODE_ENV } from '../config/env';

const app = next({
  dev: NODE_ENV === 'development',
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const staticFiles = [
    {
      path: '/service-worker.js',
      // Don't cache service worker is a best practice
      // Clients wont get emergency bug fixes etc.
      cache: false,
    },
    {
      path: '/robots.txt',
      cache: true,
    },
  ];

  // Handle static file routes
  for (const file of staticFiles) {
    server.get(file.path, (req, res) => {
      const filePath = path.resolve(`dist/static${file.path}`);

      if (!file.cache) {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      }

      app.serveStatic(req, res, filePath);
    });
  }

  // Handle other routes
  server.get('*', (req, res) => {
    // parse is deprecated, but the WHATWG URL API does not comply with the handle API
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(PORT, () => {
    console.info(`[${NODE_ENV}] Server running on http://localhost:${PORT}`);
  });
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
