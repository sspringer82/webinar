import { parentPort, workerData } from 'worker_threads';
import getPrime from './prime.js';

const p = getPrime(100_000);

workerData[0] = p;

parentPort.postMessage('ready');

process.exit();
