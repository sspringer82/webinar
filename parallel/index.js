function sleep(time) {
  const start = Date.now();
  while (Date.now() < start + time) {
    // do nothing
  }
}
console.log('a');
sleep(1000);
console.log('b');

console.log('a');
setTimeout(() => {
  console.log('c');
}, 1000);
console.log('b');
