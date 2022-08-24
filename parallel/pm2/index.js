import { createServer } from 'node:http';
import getPrime from './prime.js';

const server = createServer((request, response) => {
  console.log('incoming');

  const p = getPrime(100_000);

  response.end('foo:' + p);

  console.log('outgoing');
});

server.listen(8080, () => console.log('server is listening'));
