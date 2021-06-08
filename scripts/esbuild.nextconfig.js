/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('../package.json');

const fileName = 'next.config';

require('esbuild').build({
  tsconfig: 'tsconfig.nextconfig.json',
  entryPoints: [`${fileName}.ts`],
  outfile: `${fileName}.js`,
  platform: 'node',
  target: 'es6',
  bundle: true,
  external: Object.keys(pkg.devDependencies),
})
  .catch(() => process.exit(1));
