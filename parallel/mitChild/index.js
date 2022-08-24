import { createServer } from 'node:http';
import { fork } from 'node:child_process';

const server = createServer((request, response) => {
  console.log('incoming');

  const child = fork('./child.js');
  child.on('message', (data) => {
    response.end('foo:' + data);
    console.log('outgoing');
  });
});

server.listen(8080, () => console.log('server is listening'));
