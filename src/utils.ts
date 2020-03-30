/** Get a random element from the inpur arr.
 *
 * @param {Array} arr - Input array.
 * @returns {object} - Random element from input array. */
export function takeRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
