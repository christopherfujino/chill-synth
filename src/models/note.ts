/** @module note */

import Octave from "./octave";
import { Tone } from "./tone";

/** Cached Note singletons. */
const noteCache: Map<number, Note> = new Map();

/** A precise pitch. */
export default class Note {
  /** Should not be invoked directly, instead use .create().
   *
   * @param midiNumber - Number corresponding to MIDI value of note, from 0-127. */
  constructor(midiNumber: number) {
    this.midiNumber = midiNumber;
    this.tone = Tone.create(midiNumber % 12);
    this.octave = Octave.create(Math.floor(this.midiNumber / 12) - 1);
  }

  midiNumber: number;
  octave: Octave;
  tone: Tone;

  /** String corresponding to Note, of the form C#4.
   *
   * See https://tonejs.github.io/docs/13.8.25/Type#frequency for more info.
   *
   * @returns String representation of this Note. */
  toString(): string {
    return `${this.tone.toString()}${this.octave.toString()}`;
  }

  /** Create a new Note given a tone and an octave.
   *
   * @param tone Input tone.
   * @param octave Input octave.
   * @returns Lazily-loaded Note. */
  static fromTone(tone: Tone, octave: Octave): Note {
    return Note.create(tone.toneNumber + octave.noteOffset());
  }

  /** Will return cached instance first if it exists.
   *
   * @param midiNumber - Number corresponding to MIDI value of note, from 0-127.
   * @returns Lazily-loaded Note. */
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
