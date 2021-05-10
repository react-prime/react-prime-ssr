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

  // Remove extra / at the end of index files
  if (filepath.length > 1 && filepath.endsWith('/')) {
    filepath = filepath.slice(0, -1);
  }


  // Ignore Next files
  if (filepath.startsWith('_')) {
    return;
  }


  // Capture variable name from file name
  const routeVars = filepath.match(/\[\w+\]/g);

  if (event === 'unlink') {
    files.delete(filepath);

    // Remove from type alias list
    if (routeVars) {
      for (const routeVar of routeVars) {
        // Reserved names
        if (routeVar === 'key' && routeVar === 'value') {
          continue;
        }

        // Check if we need to delete any variable names we captured
        let deleteVar = true;

        // Loop through all filenames and check if they use this var
        for (const varFilepath of files.values()) {
          if (varFilepath.includes(getText(routeVar))) {
            deleteVar = false;
          }
        }

        if (deleteVar) {
          typeAliases.delete(getText(routeVar));
        }
      }
    }
  }

  if (event === 'add') {
    // Add var to type alias list
    if (routeVars) {
      let varFilepath = filepath;

      for (const varNameInBrackets of routeVars) {
        if (varNameInBrackets === 'Routes') {
          return console.error('❌ Error: A route variable can not be named "Routes"');
        }

        // Add to set
        typeAliases.add(getText(varNameInBrackets));

        // Replace with template type
        varFilepath = varFilepath.replace(varNameInBrackets, `\${${getText(varNameInBrackets)}}`);
      }

      // Map filepath to the template type
      files.set(filepath, varFilepath);
    } else {
      // Map filepath to itself
      files.set(filepath, filepath);
    }
  }


  // Generate file
  let text = '// This file has been auto-generated\n\n';

  // Generate type aliases
  const aliases = [];
  for (const alias of typeAliases.values()) {
    aliases.push(`type ${alias} = string;`);
  }

  text += `${aliases.sort().join('\n')}\n\n`;

  // Generate the routes union type
  const types = [];
  for (const varFilepath of files.values()) {
    const quotes = varFilepath.includes('$') ? '`' : '\'';
    const route = `${quotes}/${varFilepath}${quotes}`;
    const paramRoute = `\`/${varFilepath}?\${key}=\${value}\``;

    types.push(` | ${route}\n | ${paramRoute}`);
  }

  text += `export type Routes =\n${types.sort().join('\n')};\n`;

  // Write text to file
  fs.writeFileSync(path.resolve(PATHS.Output), text);
}

// Extract alphanumerical characters from a string
function getText(str) {
  return str.match(/\w+/)[0];
}

module.exports = generateRoutesType;
