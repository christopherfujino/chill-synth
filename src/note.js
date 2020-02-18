/** @module note */

import Octave from "./octave.js";
import Tone from "./tone.js";

/** Cached Note singletons.
 *
 * @type {Map} */
const noteCache = new Map();

/** A precise pitch. */
export default class Note {
  /** Should not be invoked directly, instead use .create().
   *
   * @param {number} midiNumber - Number corresponding to MIDI value of note, from 0-127. */
  constructor(midiNumber) {
    if (typeof midiNumber !== "number") {
      throw "You must provide a midiNumber when constructing a Note";
    }

    /** @type {number} */
    this.midiNumber = midiNumber;

    /** @type {Tone} */
    this.tone = Tone.create(midiNumber % 12);

    /** @type {Octave} */
    this.octave = Octave.create(Math.floor(this.midiNumber / 12) - 1);
  }

  /** Will return cached instance first if it exists.
   *
   * @param {number} midiNumber - Number corresponding to MIDI value of note, from 0-127.
   * @returns {Note} - Lazily-loaded Note. */
  static create(midiNumber) {
    if (noteCache.has(midiNumber)) {
      return noteCache.get(midiNumber);
    }
    const note = new Note(midiNumber);
    noteCache.set(midiNumber, note);
    return note;
  }

  /** String corresponding to Note, of the form C#4.
   *
   * See https://tonejs.github.io/docs/13.8.25/Type#frequency for more info.
   *
   * @returns {string} - String representation of this Note. */
  toString() {
    return `${this.tone.toString()}${this.octave.toString()}`;
  }

  /** For testing. */
  static resetCache() {
    noteCache.clear();
    Tone.resetCache(); // Since we lazily-load Tones in the constructor
    Octave.resetCache(); // We lazily-load Octave in the constructor
  }
}
