import path from 'path';
import next from 'next';
import express from 'express';
import { port, env } from '../config/env';
import nextOptions from '../config/next';
import router from './router';

const app = next({
  dev: env === 'development',
  dir: nextOptions.pagesDir,
});

const handle = router.getRequestHandler(app);

app.prepare()
  .then(() => {
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
    };

    // Handle other routes
    server.get('*', handle);

    server.listen(port, () => {
      console.info(`[${env}] Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
