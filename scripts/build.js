/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const color = require('kleur');

if (!process.env.APP_ENV) {
  throw new Error(color.red('Something went wrong while building the app. No APP_ENV was found. Make sure to include it when running the build script.'));
}

// All build scripts, in order of execution
const scripts = [
  'npm run build:nextconfig',
  'npm run gql:gen',
  'next build',
  'node scripts/esbuild.server.js',
];

console.info(`⚡️ Building ${color.cyan('server and app')} for ${color.cyan(process.env.APP_ENV)}...`);
const start = new Date();

// Run all scripts with all env variables
for (const script of scripts) {
  execSync(
    `NODE_ENV=production APP_ENV=${process.env.APP_ENV} ${script}`,
    {
      stdio: 'inherit',
    },
  );
}

const end = new Date();
const timeElapsed = (end - start) / 1000;

console.info(`⚡️ Succesfully built ${color.yellow(process.env.npm_package_name, process.env.npm_package_version)} in ${timeElapsed}s!`);

process.exit(0);
