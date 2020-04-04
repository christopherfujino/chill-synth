/** Get a random element from the inpur arr.
 *
 * @param arr Input array.
 * @returns Random element from input array. */
export function takeRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
