const toneMap = new Map([
  [0, "C"],
  [1, "C#"],
  [2, "D"],
  [3, "D#"],
  [4, "E"],
  [5, "F"],
  [6, "F#"],
  [7, "G"],
  [8, "G#"],
  [9, "A"],
  [10, "A#"],
  [11, "B"],
]);

const toneCache = new Map();

/** One of the 12 tones. */
export default class Tone {
  /**
   * Create a new Tone. Prefer Tone.create(), as it lazily loads.
   *
   * @param {number} toneNumber - A number between 0 and 11, mapping to the chromatic scale.
   */
  constructor(toneNumber) {
    if (toneNumber < 0 || toneNumber > 11) {
      throw `${toneNumber} is not a valid toneNumber!`;
    }
    /** Numeric mapping of notes in chromatic scale; C == 0. */
    this.toneNumber = toneNumber;
  }

  /**
   * Will return cached instance first if it exists.
   *
   * @param {number} toneNumber - A number between 0 and 11, mapping to the chromatic scale.
   * @returns {Tone} - A lazily-loaded Tone.
   */
  static create(toneNumber) {
    if (toneCache.has(toneNumber)) {
      return toneCache.get(toneNumber);
    }
    const tone = new Tone(toneNumber);
    toneCache.set(toneNumber, tone);
    return tone;
  }

  /**
   * Get name for this tone.
   *
   * @returns {string} - The string representing this tone.
   */
  toString() {
    return toneMap.get(this.toneNumber);
  }

  /** For testing. */
  static resetCache() {
    toneCache.clear();
  }
}
