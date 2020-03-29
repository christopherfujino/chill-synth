import Note from "./note";

/** Cached Range singletons.
 *
 * @type {Map} */
const rangeCache = new Map();

/** A range between two Notes. */
export default class Range {
  /** Create a new Range.
   *
   * The startNote must be less than or equal to the endNote.
   *
   * @param {Note} startNote Starting note of the range.
   * @param {Note} endNote Ending note of the range. */
  constructor(startNote, endNote) {
    if (startNote.midiNumber > endNote.midiNumber) {
      throw new Error(`startNote (${startNote}) is greater than endNote (${endNote})!`);
    }
    /** @type {Note} */
    this.startNote = startNote;
    /** @type {Note} */
    this.endNote = endNote;
  }

  /** String corresponding to Range.
   *
   * @returns {string} - String representation of this Range. */
  toString() {
    return `${this.startNote.toString()} - ${this.endNote.toString()}`;
  }

  /** Will return cached instance first if it exists.
   *
   * @param {Note} startNote First note of range, inclusive.
   * @param {Note} endNote Last note of range, inclusive.
   * @returns {Range} Lazily-loaded Range. */
  static create(startNote, endNote) {
    const key = `${startNote.toString()} - ${endNote.toString()}`;
    if (rangeCache.has(key)) {
      return rangeCache.get(key);
    }
    const range = new Range(startNote, endNote);
    rangeCache.set(key, range);
    return range;
  }

  /** For testing. */
  static resetCache() {
    rangeCache.clear();
  }
}
