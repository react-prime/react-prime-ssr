const next = require('next');
const express = require('express');
const url = require('url');
// const path = require('path');
const { port, env } = require('../../config/env');
const router = require('./router');

const app = next({
  dev: env !== 'production',

  // Set directory to search for pages
  dir: 'src/app',
});

const handle = router.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server
    .use((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const { pathname } = parsedUrl;

      if (env === 'production' && pathname === '/service-worker.js') {
        const filePath = path.join(__dirname, '../dist', pathname);

        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    })
   
  server.listen(port, (err) => {
    if (err) throw err;

    console.info(`[${env}] Server running on http://localhost:${port}`);
  });
});
