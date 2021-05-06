/* eslint-disable @typescript-eslint/no-var-requires */
const files = new Set();

const PATHS = {
  Pages: 'src/pages',
  Output: 'src/types/routes.ts',
};

function generateRoutesType(event, filepath) {
  const fs = require('fs');
  const path = require('path');

  // Remove folder path from string
  // Remove index
  // Remove extension
  // Replace dynamic pages names with template literal type
  // Remove leading /
  filepath = filepath
    .replace(path.resolve(PATHS.Pages), '')
    .replace('index', '')
    .replace('.tsx', '')
    .replace(/\[\w+\]/g, '${string}') // eslint-disable-line no-template-curly-in-string
    .substring(1);

  if (filepath.length > 1 && filepath.endsWith('/')) {
    filepath = filepath.slice(0, -1);
  }

  // Ignore Next files
  if (filepath.startsWith('_')) {
    return;
  }

  if (event === 'add') {
    files.add(filepath);
  }

  if (event === 'unlink') {
    files.delete(filepath);
  }

  const types = [];

  for (const val of files.values()) {
    const quotes = val.includes('$') ? '`' : '\'';
    const route = `${quotes}/${val}${quotes}`;
    const paramRoute = `\`/${val}?\${string}=\${string}\``;

    types.push(` | ${route}\n | ${paramRoute}`);
  }

  const t = `// This file has been auto-generated
export type Routes =
${types.sort().join('\n')};\n`;

  fs.writeFileSync(path.resolve(PATHS.Output), t);
}

module.exports = generateRoutesType;
