import { takeRandom } from "./utils.js";
import Interval from "./interval.js";
import Note from "./note.js";

/** Cache of chord singletons */
const chordCache = new Map();

export default class Chord {
  constructor(notes) {
    if (notes === undefined) {
      throw "An array of notes must be provided";
    }
    /** Array of notes in the chord */
    this.notes = notes;
    /** Lazily loaded hash string uniquely identifying this chord */
    this.hashValue = undefined;
  }

  static create(notes) {
    const key = Chord.hashNotes(notes);
    if (chordCache.has(key)) {
      return chordCache.get(key);
    }
    const chord = new Chord(notes);
    chordCache.set(key, chord);
    return chord;
  }

  get hashString() {
    if (this.hashValue === undefined) {
      this.hashValue = Chord.hashNotes(this.notes);
    }
    return this.hashValue;
  }

  /** Return a random note from this Chord */
  takeRandom() {
    return takeRandom(this.notes);
  }

  /**
    * Concatenate the .toString of each note in the provided Array.
    *
    * This is static so that - given a list of notes, it can be called to
    * determine whether the chord is already cached.
    * @param {Note[]} notes
    * @returns {String} hash of the input notes
    */
  static hashNotes(notes) {
    return notes.reduce((acc, cur) => `${acc}${cur.toString()}`);
  }

  /**
    * Lazily load a Chord with the given midiNumbers
    * @param {number[]} numbers
    * @returns {Chord} a lazily-loaded chord
    */
  static fromCodes(numbers) {
    return Chord.create(numbers.map((num) => Note.create(num)));
  }

  /**
   * Return a major chord based on a root note
   * @param {Note} rootNote
   * @returns {Chord} major chord
   */
  static majorChord(rootNote) {
    const third = Interval.majorThird.getNote(rootNote);
    const fifth = Interval.perfectFifth.getNote(rootNote);
    return Chord.create([rootNote, third, fifth]);
  }

  /**
   * Return a minor chord based on a root note
   * @param {Note} rootNote
   * @returns {Chord} minor chord
   */
  static minorChord(rootNote) {
    const third = Interval.minorThird.getNote(rootNote);
    const fifth = Interval.perfectFifth.getNote(rootNote);
    return Chord.create([rootNote, third, fifth]);
  }

  /** For testing */
  static resetCache() {
    chordCache.clear();
  }
}
