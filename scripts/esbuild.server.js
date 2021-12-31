/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const pkg = require('../package.json');

const fileName = 'server/index';

let ls;

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

require('esbuild').build({
  tsconfig: 'tsconfig.server.json',
  entryPoints: [`${fileName}.ts`],
  outfile: `dist/${fileName}.js`,
  platform: 'node',
  target: 'node10',
  bundle: true,
  external: Object.keys(pkg.dependencies),
  define: {
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
})
  .then(() => {
    console.log('\n⚡️ Server compiled succesfully!\n');
  })
  .catch(() => {
    ls.kill();
    process.exit(1);
  });
