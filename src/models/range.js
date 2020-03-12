import Note from "./note.js";

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
}
