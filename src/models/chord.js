/** @module chord */

import { takeRandom } from "../utils.js";
import Interval from "./interval.js";
import Tone from "./tone.js";

/** Cache of chord singletons. */
const chordCache = new Map();

/** A chord made up of multiple Tones. */
export default class Chord {
  /** Create a new Chord from an Array of Tones.
   *
   * @param {Tone[]} tones Tones to compose Chord with. */
  constructor(tones) {
    if (tones === undefined || tones.length < 1) {
      throw new Error(`An array of tones must be provided; tones: ${tones}`);
    }
    /** Array of tones in the chord.
     *
     * @type {Tone[]} */
    this.tones = tones;
    /** Lazily loaded hash string uniquely identifying this chord. */
    this.hashValue = undefined;
  }

  /** Lazily-load a Chord from the given Tones.
   *
   * @param {Tone[]} tones Tones to compose Chord with.
   * @returns {Chord} Lazily-loaded Chord. */
  static create(tones) {
    const key = Chord.hashTones(tones);
    if (chordCache.has(key)) {
      return chordCache.get(key);
    }
    const chord = new Chord(tones);
    chordCache.set(key, chord);
    return chord;
  }

  toString() {
    return Chord.hashTones(this.tones);
  }

  /** Uniquely-identifying string of all Tones in this Chord.
   *
   * @returns {string} Hash string. */
  get hashString() {
    return Chord.hashTones(this.tones);
  }

  /** Return a random note within the given range from this Chord.
   *
   * @param {Range} range Inclusive range from which to return Notes.
   * @returns {Tone} A random tone. */
  takeRandomInRange(range) {
    const notes = [];
    for (let i = 0; i < this.tones.length; i++) {
      const notesFromTone = this.tones[i].findNotesFromRange(range);
      notes.push(...notesFromTone);
    }

    return takeRandom(notes);
  }

  /** Concatenate the .toString of each tone in the provided Array.
   *
   * This is static so that given a list of tones, it can be called to
   * determine whether the chord is already cached.
   *
   * @param {Tone[]} tones The tones you wish to get a unique identifier for.
   * @returns {string} A hash string of the input tones. */
  static hashTones(tones) {
    return tones.reduce((acc, cur) => acc + cur.toString());
  }

  /** Return a major chord based on a root tone.
   *
   * @param {Tone} rootTone Tone corresponding to the root of the chord.
   * @returns {Chord} A major chord. */
  static majorChord(rootTone) {
    const third = Interval.majorThird.getTone(rootTone);
    const fifth = Interval.perfectFifth.getTone(rootTone);
    return Chord.create([rootTone, third, fifth]);
  }

  /** Return a minor chord based on a root tone.
   *
   * @param {Tone} rootTone Tone corresponding to the root of the chord.
   * @returns {Chord} A minor chord. */
  static minorChord(rootTone) {
    const third = Interval.minorThird.getTone(rootTone);
    const fifth = Interval.perfectFifth.getTone(rootTone);
    return Chord.create([rootTone, third, fifth]);
  }

  /** For testing. */
  static resetCache() {
    chordCache.clear();
  }
}
