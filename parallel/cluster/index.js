import cluster from 'node:cluster';
import { createServer } from 'node:http';
import { cpus } from 'node:os';
import process from 'node:process';
import getPrime from './prime.js';

const numCPUs = cpus().length - 6;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = createServer((request, response) => {
    console.log('incoming');

    const p = getPrime(100_000);

    response.end('foo:' + p);

    console.log('outgoing');
  });

  server.listen(8080, () => console.log('server is listening'));

  console.log(`Worker ${process.pid} started`);
}
