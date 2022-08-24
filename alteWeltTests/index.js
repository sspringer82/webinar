const { readFile } = require('node:fs/promises');

module.exports = async function countLines(filename) {
  const fileContent = await readFile(filename, 'utf-8');
  return fileContent.split('\n').length;
};
