import { takeRandom } from "./utils.js";
import Interval from "./interval.js";
import Note from "./note.js";

/** Cache of chord singletons. */
const chordCache = new Map();

/** A chord made up of multiple Notes. */
export default class Chord {
  /** Create a new Chord from an Array of Notes.
   *
   * @param {Note[]} notes Notes to compose Chord with. */
  constructor(notes) {
    if (notes === undefined) {
      throw "An array of notes must be provided";
    }
    /** Array of notes in the chord.
     *
     * @type {Note[]} */
    this.notes = notes;
    /** Lazily loaded hash string uniquely identifying this chord. */
    this.hashValue = undefined;
  }

  /** Lazily-load a Chord from the given Notes.
   *
   * @param {Note[]} notes Notes to compose Chord with.
   * @returns {Chord} Lazily-loaded Chord. */
  static create(notes) {
    const key = Chord.hashNotes(notes);
    if (chordCache.has(key)) {
      return chordCache.get(key);
    }
    const chord = new Chord(notes);
    chordCache.set(key, chord);
    return chord;
  }

  /** Uniquely-identifying string of all Notes in this Chord.
   *
   * @returns {string} Hash string. */
  get hashString() {
    return Chord.hashNotes(this.notes);
  }

  /** Return a random note from this Chord.
   *
   * @returns {Note} A random note. */
  takeRandom() {
    return takeRandom(this.notes);
  }

  /** Concatenate the .toString of each note in the provided Array.
   *
   * This is static so that given a list of notes, it can be called to
   * determine whether the chord is already cached.
   *
   * @param {Note[]} notes The notes you wish to get a unique identifier for.
   * @returns {string} A hash string of the input notes. */
  static hashNotes(notes) {
    return notes.reduce((acc, cur) => `${acc}${cur.toString()}`);
  }

  /** Lazily load a Chord with the given midiNumbers.
   *
   * @param {number[]} numbers MIDI numbers to corresponding to the notes in the chord.
   * @returns {Chord} A lazily-loaded chord. */
  static fromCodes(numbers) {
    return Chord.create(numbers.map((num) => Note.create(num)));
  }

  /** Return a major chord based on a root note.
   *
   * @param {Note} rootNote Note corresponding to the root of the chord.
   * @returns {Chord} A major chord. */
  static majorChord(rootNote) {
    const third = Interval.majorThird.getNote(rootNote);
    const fifth = Interval.perfectFifth.getNote(rootNote);
    return Chord.create([rootNote, third, fifth]);
  }

  /** Return a minor chord based on a root note.
   *
   * @param {Note} rootNote Note corresponding to the root of the chord.
   * @returns {Chord} A minor chord. */
  static minorChord(rootNote) {
    const third = Interval.minorThird.getNote(rootNote);
    const fifth = Interval.perfectFifth.getNote(rootNote);
    return Chord.create([rootNote, third, fifth]);
  }

  /** For testing. */
  static resetCache() {
    chordCache.clear();
  }
}
