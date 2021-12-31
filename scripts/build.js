/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync, spawnSync } = require('child_process');
const color = require('kleur');

if (!process.env.APP_ENV) {
  throw new Error(color.red('Something went wrong while building the app. No APP_ENV was found. Make sure to include it when running the build script.'));
}

// All build scripts, in order of execution
const scripts = [
  {
    concurrently: [
      'npm run build:nextconfig',
      'npm run gql:gen',
    ],
  },
  'next build',
  'node scripts/esbuild.server.js',
];

console.info(`⚡️ Building ${color.cyan('server and app')} for ${color.cyan(process.env.APP_ENV)}...`);
const start = new Date();

// Run all scripts with all env variables
for (const script of scripts) {
  switch (typeof script) {
    case 'string':
      execSync(
        `NODE_ENV=production APP_ENV=${process.env.APP_ENV} ${script}`,
        {
          stdio: 'inherit',
        },
      );
      break;
    case 'object':
      for (const key in script) {
        // Join all scripts with all env variables to an array of strings
        const scriptsWithEnv = script[key].map((str) => `"NODE_ENV=production APP_ENV=${process.env.APP_ENV} ${str}"`);

        // Start process with program 'key' + all scripts and env variables
        spawnSync(
          key, scriptsWithEnv,
          {
            stdio: 'inherit',
          },
        );
      }
      break;
    default:
      throw new Error(`Unknown script type: ${typeof script}`);
  }
}

const end = new Date();
const timeElapsed = (end - start) / 1000;

console.info(`⚡️ Succesfully built ${color.yellow(process.env.npm_package_name, process.env.npm_package_version)} in ${timeElapsed}s!`);

process.exit(0);
