import Note from "./note";

/** Cached Range singletons. */
const rangeCache = new Map<string, Range>();

/** A range between two Notes. */
export default class Range {
  /** Create a new Range.
   *
   * The startNote must be less than or equal to the endNote.
   *
   * @param startNote Starting note of the range.
   * @param endNote Ending note of the range. */
  constructor(startNote: Note, endNote: Note) {
    if (startNote.midiNumber > endNote.midiNumber) {
      throw new Error(`startNote (${startNote}) is greater than endNote (${endNote})!`);
    }
    this.startNote = startNote;
    this.endNote = endNote;
  }

  startNote: Note;
  endNote: Note;

  /** String corresponding to Range.
   *
   * @returns String representation of this Range. */
  toString(): string {
    return `${this.startNote.toString()} - ${this.endNote.toString()}`;
  }

  /** Will return cached instance first if it exists.
   *
   * @param startNote First note of range, inclusive.
   * @param endNote Last note of range, inclusive.
   * @returns Lazily-loaded Range. */
  static create(startNote: Note, endNote: Note): Range {
    const key = `${startNote.toString()} - ${endNote.toString()}`;
    let cachedRange = rangeCache.get(key);
    if (cachedRange === undefined) {
      cachedRange = new Range(startNote, endNote);
      rangeCache.set(key, cachedRange);
    }
    return cachedRange;
  }

  /** For testing. */
  static resetCache(): void {
    rangeCache.clear();
  }
}
