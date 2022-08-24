export default function getPrime(until) {
  let factor;
  let prime = 0;
  for (let i = 0; i < until; i++) {
    factor = 0;
    for (let j = 1; j <= until; j++) {
      if (i % j == 0) {
        factor++;
      }
    }
    if (factor == 2) {
      prime = i;
    }
  }
  return prime;
}
