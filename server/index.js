const path = require('path');
const next = require('next');
const express = require('express');
const { port, env } = require('../config/env');
const nextOptions = require('../config/next');
const router = require('./router');

const app = next({
  dev: env !== 'production',
  dir: nextOptions.pagesDir,
});

const handle = router.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();
    const isProduction = env === 'production';

    if (isProduction) {
      server.get('/service-worker.js', (req, res) => {
        const filePath = path.resolve('dist/service-worker.js');

        // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Content-Type', 'application/javascript');

        app.serveStatic(req, res, filePath);
      });
    }

    server.get('*', (req, res) => {
      // Fix static urls that don't include _next in the URL
      if (req.url.includes('static') && !req.url.includes('_next')) {
        req.url = req.url.replace('/static', '/_next/static');
      }

      handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;

      console.info(`[${env}] Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
