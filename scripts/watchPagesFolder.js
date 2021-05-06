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
  const chokidar = require('chokidar');
  const { resolve } = require('path');
  const generateRoutesType = require('./generateRoutesType');

  try {
    const watcher = chokidar.watch(resolve('src/pages'), {
      ignored: /^\./,
      persistent: true,
    });

    watcher.on('all', (event, path) => {
      // Ignore file changes (file/folder name changes have the add/addDir event)
      if (event !== 'change') {
        generateRoutesType(event, path);
        logGenerateDone();
      }
    });
  } catch (err) {
    throw err;
  }
}

module.exports = watchPagesFolder;
