/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync, spawnSync } = require('child_process');
const color = require('kleur');

// All build scripts, in order of execution
const scripts = [
  'npm run build:nextconfig',
  {
    concurrently: [
      'npm run gql:gen -- --watch',
      'next dev',
    ],
  },
];

console.info(`⚡️ Starting the ${color.cyan('development server')}...`);

// Run all scripts with all env variables
for (const script of scripts) {
  switch (typeof script) {
    case 'string':
      execSync(
        `APP_ENV=development ${script}`,
        {
          stdio: 'inherit',
        },
      );
      break;
    case 'object':
      for (const key in script) {
        // Join all scripts with all env variables to an array of strings
        const scriptsWithEnv = script[key].map((str) => `"APP_ENV=development ${str}"`);

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

// Exit with error: if the program reaches this line then something went wrong
process.exit(1);
