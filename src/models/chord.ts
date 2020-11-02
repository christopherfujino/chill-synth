/** @module chord */

import { takeRandom } from "../utils";
import Interval from "./interval";
import Note from "./note";
import Range from "./range";
import { Tone } from "./tone";

/** Cache of chord singletons. */
const chordCache = new Map();

/** A chord made up of multiple Tones. */
export default class Chord {
  /** Create a new Chord from an Array of Tones.
   *
   * @param tones Tones to compose Chord with. */
  constructor(tones: Tone[]) {
    /** Array of tones in the chord.
     *
     * @type {Tone[]} */
    this.tones = tones;
    /** Lazily loaded hash string uniquely identifying this chord. */
    this.hashValue = undefined;
  }

  tones: Tone[];
  hashValue: string | undefined;

  /** Lazily-load a Chord from the given Tones.
   *
   * @param tones Tones to compose Chord with.
   * @returns Lazily-loaded Chord. */
  static create(tones: Tone[]): Chord {
    const key = Chord.hashTones(tones);
    if (chordCache.has(key)) {
      return chordCache.get(key);
    }
    const chord = new Chord(tones);
    chordCache.set(key, chord);
    return chord;
  }

  toString(): string {
    return Chord.hashTones(this.tones);
  }

  /** Uniquely-identifying string of all Tones in this Chord.
   *
   * @returns Hash string. */
  get hashString(): string {
    return Chord.hashTones(this.tones);
  }

  /** Return a random note within the given range from this Chord.
   *
   * @param range Inclusive range from which to return Notes.
   * @returns A random note. */
  takeRandomInRange(range: Range): Note {
    const notes = [];
    for (let i = 0; i < this.tones.length; i++) {
      const notesFromTone = this.tones[i].findNotesFromRange(range);
      Array.prototype.push.apply(notes, notesFromTone);
    }

    return takeRandom<Note>(notes);
  }

  /** Concatenate the .toString of each tone in the provided Array.
   *
   * This is static so that given a list of tones, it can be called to
   * determine whether the chord is already cached.
   *
   * @param tones The tones you wish to get a unique identifier for.
   * @returns A hash string of the input tones. */
  static hashTones(tones: Tone[]): string {
    return tones.reduce<string>(
      (acc: string, cur: Tone) => `${acc}${cur.toString()}`,
      "",
    );
  }

  /** Return a major chord based on a root tone.
   *
   * @param rootTone Tone corresponding to the root of the chord.
   * @returns A major chord. */
  static majorChord(rootTone: Tone): Chord {
    const third: Tone = Interval.majorThird.getTone(rootTone);
    const fifth: Tone = Interval.perfectFifth.getTone(rootTone);
    return Chord.create([rootTone, third, fifth]);
  }

  /** Return a minor chord based on a root tone.
   *
   * @param rootTone Tone corresponding to the root of the chord.
   * @returns A minor chord. */
  static minorChord(rootTone: Tone): Chord {
    const third = Interval.minorThird.getTone(rootTone);
    const fifth = Interval.perfectFifth.getTone(rootTone);
    return Chord.create([rootTone, third, fifth]);
  }

  /** Return a diminished chord based on a root tone.
   *
   * @param rootTone Tone corresponding to the root of the chord.
   * @returns A diminished chord. */
  static diminished(rootTone: Tone): Chord {
    const third = Interval.minorThird.getTone(rootTone);
    const fifth = Interval.tritone.getTone(rootTone);
    return Chord.create([rootTone, third, fifth]);
  }

  /** For testing. */
  static resetCache(): void {
    chordCache.clear();
  }
}
