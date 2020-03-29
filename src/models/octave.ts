/** @module octave */

/** Cached octaves. */
const octaveCache = new Map();

/** Which octave a Note belongs to. */
export default class Octave {
  /** Create a new Octave.
   *
   * @param {number} octaveNumber A number between -1 and 9. */
  constructor (octaveNumber) {
    if (typeof octaveNumber !== "number" || octaveNumber < -1 || octaveNumber > 9) {
      throw `octaveNumber ${octaveNumber} is not within legal bounds!`;
    }
    /** @type {number} */
    this.octaveNumber = octaveNumber;
  }

  /** Return integer.
   *
   * @returns {number} Integer offset. */
  noteOffset () {
    return (this.octaveNumber + 1) * 12;
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
