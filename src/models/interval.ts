/** @module interval */

import Note from "./note";
import { Tone } from "./tone";

/** Lazily-loaded cache of interval singletons. */
const intervalCache = new Map();

/**
 * Represents an interval between two Notes.
 */
export default class Interval {
  /**
   * Should not be invoked directly -- use .create().
   *
   * @param distance Number of semitones in this interval.
   */
  constructor(distance: number) {
    this.distance = distance;
  }

  distance: number;

  /**
   * Lazily load interval from cache.
   *
   * @param distance Number of semitones in this interval.
   * @returns Lazily-loaded interval. */
  static create(distance: number): Interval {
    if (intervalCache.has(distance)) {
      return intervalCache.get(distance);
    }
    const interval = new Interval(distance);
    intervalCache.set(distance, interval);
    return interval;
  }

  /**
   * Given a sourceNote, returns a new Note this interval away.
   *
   * @param sourceNote The Note to start from.
   * @returns The new (lazily-loaded) Note.
   */
  getNote(sourceNote: Note): Note {
    return Note.create(sourceNote.midiNumber + this.distance);
  }

  /**
   * Given a sourceTone, returns a new Tone this interval away.
   *
   * @param sourceTone The Tone to start from.
   * @returns The new (lazily-loaded) Tone.
   */
  getTone(sourceTone: Tone): Tone {
    return Tone.create(sourceTone.toneNumber + this.distance);
  }

  /**
   * An interval with no distance.
   *
   * @returns Lazily-loaded Interval.
   */
  static get unison(): Interval {
    return Interval.create(0);
  }

  /**
   * An interval with a distance of one step.
   *
   * @returns Lazily-loaded Interval.
   */
  static get semitone(): Interval {
    return Interval.create(1);
  }

  /**
   * An interval with a distance of one step.
   *
   * @returns Lazily-loaded Interval.
   */
  static get minorSecond(): Interval {
    return Interval.create(1);
  }

  /**
   * An interval with a distance of two steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get wholeTone(): Interval {
    return Interval.create(2);
  }

  /**
   * An interval with a distance of two steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get majorSecond(): Interval {
    return Interval.create(2);
  }

  /**
   * An interval with a distance of three steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get minorThird(): Interval {
    return Interval.create(3);
  }

  /**
   * An interval with a distance of four steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get majorThird(): Interval {
    return Interval.create(4);
  }

  /**
   * An interval with a distance of five steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get perfectFourth(): Interval {
    return Interval.create(5);
  }

  /**
   * An interval with a distance of six steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get tritone(): Interval {
    return Interval.create(6);
  }

  /**
   * An interval with a distance of seven steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get perfectFifth(): Interval {
    return Interval.create(7);
  }

  /**
   * An interval with a distance of eight steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get minorSixth(): Interval {
    return Interval.create(8);
  }

  /**
   * An interval with a distance of nine steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get majorSixth(): Interval {
    return Interval.create(9);
  }

  /**
   * An interval with a distance of ten steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get minorSeventh(): Interval {
    return Interval.create(10);
  }

  /**
   * An interval with a distance of eleven steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get majorSeventh(): Interval {
    return Interval.create(11);
  }

  /**
   * An interval with a distance of twelve steps.
   *
   * @returns Lazily-loaded Interval.
   */
  static get octave(): Interval {
    return Interval.create(12);
  }

  /**
   * For testing purposes - clear the cache.
   */
  static resetCache(): void {
    intervalCache.clear();
  }
}
