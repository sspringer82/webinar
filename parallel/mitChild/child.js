import getPrime from './prime.js';
const p = getPrime(100_000);
process.send(p);
