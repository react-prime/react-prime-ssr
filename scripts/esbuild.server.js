/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const pkg = require('../package.json');

const fileName = 'server/index';
const isDev = Boolean(process.env.DEV);

let ls;

require('esbuild').build({
  tsconfig: 'tsconfig.server.json',
  entryPoints: [`${fileName}.ts`],
  outfile: `dist/${fileName}.js`,
  platform: 'node',
  target: 'node10',
  bundle: true,
  external: Object.keys(pkg.dependencies),
})
  .then(() => {
    console.log('⚡️ Server compiled succesfully');

    if (isDev) {
      runNextServer();
    }
  })
  .catch(() => {
    ls.kill();
    process.exit(1);
  });


function runNextServer() {
  const cp = require('child_process');

  if (ls) {
    ls.kill();
  }

  ls = cp.spawn('node', ['dist/server/index.js'], { stdio: 'inherit' });

  if (ls.stdout) {
    ls.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
  }

  if (ls.stderr) {
    ls.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  }
}
