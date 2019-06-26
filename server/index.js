const path = require('path');
const next = require('next');
const express = require('express');
const { port, env } = require('../config/env');
const nextOptions = require('../config/next');
const router = require('./router');

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

    server.listen(port, (err) => {
      if (err) throw err;

      console.info(`[${env}] Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
