/** @module interval */

import Note from "./note.js";
import Tone from "./tone.js";

/** Lazily-loaded cache of interval singletons. */
const intervalCache = new Map();

/**
 * Represents an interval between two Notes.
 */
export default class Interval {
  /**
   * Should not be invoked directly -- use .create().
   *
   * @param {number} distance - Number of semitones in this interval.
   */
  constructor(distance) {
    if (distance === undefined) {
      throw "Must supply distance!";
    }
    this.distance = distance;
  }

  /**
   * Lazily load interval from cache.
   *
   * @param {number} distance - Number of semitones in this interval.
   * @returns {Interval} - Lazily-loaded interval. */
  static create(distance) {
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
   * @param {Note} sourceNote - The Note to start from.
   * @returns {Note} - The new (lazily-loaded) Note.
   */
  getNote(sourceNote) {
    return Note.create(sourceNote.midiNumber + this.distance);
  }

  /**
   * Given a sourceTone, returns a new Tone this interval away.
   *
   * @param {Tone} sourceTone - The Tone to start from.
   * @returns {Tone} - The new (lazily-loaded) Tone.
   */
  getTone(sourceTone) {
    return Tone.create(sourceTone.toneNumber + this.distance);
  }

  /**
   * An interval with no distance.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get unison() {
    return Interval.create(0);
  }

  /**
   * An interval with a distance of one step.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get semitone() {
    return Interval.create(1);
  }

  /**
   * An interval with a distance of one step.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get minorSecond() {
    return Interval.create(1);
  }

  /**
   * An interval with a distance of two steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get wholeTone() {
    return Interval.create(2);
  }

  /**
   * An interval with a distance of two steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get majorSecond() {
    return Interval.create(2);
  }

  /**
   * An interval with a distance of three steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get minorThird() {
    return Interval.create(3);
  }

  /**
   * An interval with a distance of four steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get majorThird() {
    return Interval.create(4);
  }

  /**
   * An interval with a distance of five steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get perfectFourth() {
    return Interval.create(5);
  }

  /**
   * An interval with a distance of six steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get tritone() {
    return Interval.create(6);
  }

  /**
   * An interval with a distance of seven steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get perfectFifth() {
    return Interval.create(7);
  }

  /**
   * An interval with a distance of eight steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get minorSixth() {
    return Interval.create(8);
  }

  /**
   * An interval with a distance of nine steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get majorSixth() {
    return Interval.create(9);
  }

  /**
   * An interval with a distance of ten steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get minorSeventh() {
    return Interval.create(10);
  }

  /**
   * An interval with a distance of eleven steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get majorSeventh() {
    return Interval.create(11);
  }

  /**
   * An interval with a distance of twelve steps.
   *
   * @returns {Interval} - Lazily-loaded Interval.
   */
  static get octave() {
    return Interval.create(12);
  }

  /**
   * For testing purposes - clear the cache.
   */
  static resetCache() {
    intervalCache.clear();
  }
}
