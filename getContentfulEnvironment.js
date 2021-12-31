/* eslint-disable @typescript-eslint/no-var-requires */
const contentfulManagement = require('contentful-management');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

// Generate .d.ts file depending on build environment makes sure the CMS is up-to-date with our code
const PREFIX = {
  production: 'PROD',
  development: 'DEV',
  acceptance: 'ACC',
}[process.env.APP_ENV];

module.exports = async () => {
  const client = contentfulManagement.createClient({
    accessToken: process.env[PREFIX + '__CF_MANAGEMENT_ACCESS_TOKEN'],
  });

  return await client
    .getSpace(process.env[PREFIX + '__CF_SPACE_ID'])
    .then((space) => space.getEnvironment(process.env[PREFIX + '__CF_ENVIRONMENT']));
};
