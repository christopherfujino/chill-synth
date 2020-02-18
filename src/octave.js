/** @module octave */

/** Cached octaves. */
const octaveCache = new Map();

/** Which octave a Note belongs to. */
export default class Octave {
  /** Create a new Octave.
   *
   * @param {number} octaveNumber A number between -1 and 10. */
  constructor (octaveNumber) {
    if (typeof octaveNumber !== "number" || octaveNumber < -1 || octaveNumber > 10) {
      throw `octaveNumber ${octaveNumber} is not within legal bounds!`;
    }
    /** @type {number} */
    this.octaveNumber = octaveNumber;
  }

  /** Return string representing this octave number.
   *
   * @returns {string} String representing this octave. */
  toString() {
    return this.octaveNumber.toString();
  }

  /** Lazily-load an Octave.
   *
   * @param {number} octaveNumber A number from -1 to 10.
   * @returns {Octave} A lazily-loaded Octave. */
  static create(octaveNumber) {
    if (octaveCache.has(octaveNumber)) {
      return octaveCache.get(octaveNumber);
    }
    const octave = new Octave(octaveNumber);
    octaveCache.set(octaveNumber, octave);
    return octave;
  }

  /** For testing. */
  static resetCache() {
    octaveCache.clear();
  }
}
