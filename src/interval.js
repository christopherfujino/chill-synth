import Note from "./note.js";

/** Lazily loaded cache of interval singletons */
const intervalCache = new Map();

export default class Interval {
  /** Should not be invoked directly -- use .create() */
  constructor(distance) {
    if (distance === undefined) {
      throw "Must supply distance!";
    }
    this.distance = distance;
  }

  /** Lazily load interval from cache */
  static create(distance) {
    if (intervalCache.has(distance)) {
      return intervalCache.get(distance);
    }
    const interval = new Interval(distance);
    intervalCache.set(distance, interval);
    return interval;
  }

  /** Given a sourceNote, returns a new Note this interval away*/
  getNote(sourceNote) {
    return Note.create(sourceNote.midiNumber + this.distance);
  }

  static get unison() {
    return Interval.create(0);
  }

  static get semitone() {
    return Interval.create(1);
  }

  static get minorSecond() {
    return Interval.create(1);
  }

  static get wholeTone() {
    return Interval.create(2);
  }

  static get majorSecond() {
    return Interval.create(2);
  }

  static get minorThird() {
    return Interval.create(3);
  }

  static get majorThird() {
    return Interval.create(4);
  }

  static get perfectFourth() {
    return Interval.create(5);
  }

  static get tritone() {
    return Interval.create(6);
  }

  static get perfectFifth() {
    return Interval.create(7);
  }

  static get minorSixth() {
    return Interval.create(8);
  }

  static get majorSixth() {
    return Interval.create(9);
  }

  static get minorSeventh() {
    return Interval.create(10);
  }

  static get majorSeventh() {
    return Interval.create(11);
  }

  static get octave() {
    return Interval.create(12);
  }

  static resetCache() {
    intervalCache.clear();
  }
}
