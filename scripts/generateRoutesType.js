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
  const result = filepath.match(/\[\w+\]/g);

  if (event === 'unlink') {
    files.delete(filepath);

    // Remove from type alias list
    if (result) {
      for (const varName of result) {
        // Reserved names
        if (varName === 'key' && varName === 'value') {
          continue;
        }

        // Check if we need to delete any variable names we captured
        let del = true;
        for (const varFilepath of files.values()) {
          if (varFilepath.includes(getText(varName))) {
            del = false;
          }
        }

        if (del) {
          typeAliases.delete(getText(varName));
        }
      }
    }
  }

  if (event === 'add') {
    // Add var to type alias list
    if (result) {
      let varFilepath = filepath;

      for (const varNameInBrackets of result) {
        if (varNameInBrackets === 'Routes') {
          return console.error('❌ Error: A route variable can not be named "Routes"');
        }

        // Add to set
        typeAliases.add(getText(varNameInBrackets));

        // Replace with template type
        varFilepath = varFilepath.replace(varNameInBrackets, `\${${getText(varNameInBrackets)}}`);
      }

      files.set(filepath, varFilepath);
    } else {
      files.set(filepath, filepath);
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

  fs.writeFileSync(path.resolve(PATHS.Output), text);
}

function getText(str) {
  return str.match(/\w+/)[0];
}

module.exports = generateRoutesType;
