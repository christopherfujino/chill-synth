/** Get a random integer from 0 to [max] */
export function takeRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
