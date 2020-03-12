import Note from "./note.js";

/** Cached Range singletons.
 *
 * @type {Map} */
const rangeCache = new Map();

/** A range between two Notes. */
export default class Range {
  /** Create a new Range.
   *
   * @param {Note} startNote Starting note of the range.
   * @param {Note} endNote Ending note of the range. */
  constructor(startNote, endNote) {
    /** @type {Note} */
    this.startNote = startNote;
    /** @type {Note} */
    this.endNote = endNote;
  }

  toString() {
    return `${this.startNote.toString()} - ${this.endNote.toString()}`;
  }

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
