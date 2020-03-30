/** @module note */

import Octave from "./octave";
import Tone from "./tone";

/** Cached Note singletons.
 *
 * @type {Map} */
const noteCache: Map<number, Note> = new Map();

/** A precise pitch. */
export default class Note {
  /** Should not be invoked directly, instead use .create().
   *
   * @param {number} midiNumber - Number corresponding to MIDI value of note, from 0-127. */
  constructor(midiNumber: number) {
    /** @type {number} */
    this.midiNumber = midiNumber;

    /** @type {Tone} */
    this.tone = Tone.create(midiNumber % 12);

    /** @type {Octave} */
    this.octave = Octave.create(Math.floor(this.midiNumber / 12) - 1);
  }

  midiNumber: number;
  octave: Octave;
  tone: Tone;

  /** String corresponding to Note, of the form C#4.
   *
   * See https://tonejs.github.io/docs/13.8.25/Type#frequency for more info.
   *
   * @returns {string} - String representation of this Note. */
  toString(): string {
    return `${this.tone.toString()}${this.octave.toString()}`;
  }

  /** Create a new Note given a tone and an octave.
   *
   * @param {Tone} tone Input tone.
   * @param {Octave} octave Input octave.
   * @returns {Note} Lazily-loaded Note. */
  static fromTone(tone: Tone, octave: Octave): Note {
    return Note.create(tone.toneNumber + octave.noteOffset());
  }

  /** Will return cached instance first if it exists.
   *
   * @param {number} midiNumber - Number corresponding to MIDI value of note, from 0-127.
   * @returns {Note} - Lazily-loaded Note. */
  static create(midiNumber: number): Note {
    let note = noteCache.get(midiNumber);
    if (note !== undefined) {
      return note;
    }
    note = new Note(midiNumber);
    noteCache.set(midiNumber, note);
    return note;
  }

  /** For testing. Also clears Tone and Octave caches. */
  static resetCache(): void {
    noteCache.clear();
    Tone.resetCache(); // Since we lazily-load Tones in the constructor
    Octave.resetCache(); // We lazily-load Octave in the constructor
  }
}
