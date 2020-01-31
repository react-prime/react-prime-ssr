import path from 'path';
import next from 'next';
import express from 'express';
import { port, env } from '../config/env';
import nextOptions from '../config/next';
import router from './router';

const isProd = env === 'production';

const app = next({
  dev: !isProd,
  dir: nextOptions.pagesDir,
});

const handle = router.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();

    if (isProd) {
      server.get('/service-worker.js', (req, res) => {
        const filePath = path.resolve('dist/service-worker.js');

        // Don't cache service worker is a best practice
        // Clients wont get emergency bug fixes etc.
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Content-Type', 'application/javascript');

        app.serveStatic(req, res, filePath);
      });
    }

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
