/* eslint-disable @typescript-eslint/no-var-requires */
const files = new Map();
const typeAliases = new Set();

typeAliases.add('key');
typeAliases.add('value');

const PATHS = {
  Pages: 'src/pages',
  Output: 'src/types/routes.ts',
};

function generateRoutesType(event, filepath) {
  const fs = require('fs');
  const path = require('path');

  return new Promise((resolve, reject) => {
    throw Error();
    // Remove folder path from string
    // Remove index
    // Remove extension
    // Remove leading /
    filepath = filepath
      .replace(path.resolve(PATHS.Pages), '')
      .replace('index', '')
      .replace('.tsx', '')
      .substring(1);

    if (filepath.length > 1 && filepath.endsWith('/')) {
      filepath = filepath.slice(0, -1);
    }

    // Ignore Next files
    if (filepath.startsWith('_')) {
      return;
    }


    // Capture variable name from file name
    const result = /\[(?<var>\w+)\]/.exec(filepath);
    const varName = result?.groups?.var;

    if (event === 'add') {
    // Add var to type alias list
      if (varName) {
        if (varName === 'Routes') {
          return reject('A route variable can not be named "Routes"');
        }

        // Add to set
        typeAliases.add(varName);

        // Replace with template type
        const varFilepath = filepath.replace(/\[\w+\]/g, `\${${varName}}`);

        files.set(filepath, varFilepath);
      } else {
        files.set(filepath, filepath);
      }
    }

    if (event === 'unlink') {
      files.delete(filepath);

      // Remove from type alias list
      if (varName && varName !== 'key' && varName !== 'value') {
        typeAliases.delete(varName);
      }
    }


    // Generate file
    let text = '// This file has been auto-generated\n\n';

    const aliases = [];
    for (const alias of typeAliases.values()) {
      aliases.push(`type ${alias} = string;`);
    }

    text += `${aliases.sort().join('\n')}\n\n`;

    const types = [];
    for (const varFilepath of files.values()) {
      const quotes = varFilepath.includes('$') ? '`' : '\'';
      const route = `${quotes}/${varFilepath}${quotes}`;
      const paramRoute = `\`/${varFilepath}?\${key}=\${value}\``;

      types.push(` | ${route}\n | ${paramRoute}`);
    }

    text += `export type Routes =\n${types.sort().join('\n')};\n`;

    fs.writeFile(path.resolve(PATHS.Output), text, resolve);
  });
}

module.exports = generateRoutesType;
