const next = require('next');
const express = require('express');
const url = require('url');
const path = require('path');
const { port, env } = require('../config/env');
const router = require('./router');

const app = next({
  dev: env !== 'production',

  // Set directory to search for pages
  dir: 'src/app/components',
});

const handle = router.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.use((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    // Fix static urls that don't include _next in the URL
    if (req.url.includes('static') && !req.url.includes('_next')) {
      req.url = req.url.replace('/static', '/_next/static');
    }

    if (env === 'production' && pathname === '/service-worker.js') {
      const filePath = path.join(__dirname, '../dist', pathname);

      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;

    console.info(`[${env}] Server running on http://localhost:${port}`);
  });
});
