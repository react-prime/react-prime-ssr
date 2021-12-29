/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const pkg = require('../package.json');

const fileName = 'server/index';

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
    console.log('⚡️ Server compiled succesfully!\n');
  })
  .catch(() => {
    ls.kill();
    process.exit(1);
  });
