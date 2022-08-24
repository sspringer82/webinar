jest.mock('node:fs/promises', () => {
  return {
    readFile(name, encoding) {
      return 'a\nb\nc\nd';
    },
  };
});

const countLines = require('./index.js');

test('countLines', async () => {
  const lines = await countLines('input.txt');
  expect(lines).toBe(4);
});
