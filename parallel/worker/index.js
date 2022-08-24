import { Worker } from 'node:worker_threads';

import { createServer } from 'node:http';

const server = createServer((request, response) => {
  console.log('incoming');

  const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
  const arr = new Int32Array(sharedBuffer);

  const worker = new Worker('./worker.js', {
    workerData: arr,
  });

  worker.on('message', (data) => {
    console.log(`Worker seems to be ${data}`);
    console.log(arr[0]);
    response.end('foo:' + arr[0]);

    console.log('outgoing');
  });
});

server.listen(8080, () => console.log('server is listening'));
