/* eslint-disable @typescript-eslint/no-var-requires */
let lastLog = 0;

// Debounce does not work
function logGenerateDone() {
  const now = Date.now();
  if (now - lastLog > 1000) {
    process.stdout.write('🤖 Route types have been updated\n');
    lastLog = now;
  }
}

function watchPagesFolder() {
  return new Promise((resolve, reject) => {
    const chokidar = require('chokidar');
    const path = require('path');
    const generateRoutesType = require('./generateRoutesType');

    // Watch for any folder changes
    const watcher = chokidar.watch(path.resolve('src/pages'), {
      ignored: /^\./,
      persistent: true,
    });

    watcher.on('all', (event, path) => {
      // Ignore file changes (file/folder name changes have the add/addDir event)
      if (event !== 'change') {
        try {
          generateRoutesType(event, path);
          logGenerateDone();
        } catch (err) {
          reject(err);
        }
      }
    });

    watcher.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = watchPagesFolder;
