import Note from "./note.js";

/*
 * 1 -> minor second
 * 2 -> major second
 * 3 -> minor third
 * 4 -> major third
 * 5 -> perfect fourth
 * 6 -> augmented fourth/diminished fifth
 * 7 -> perfect fifth
 * 8 -> minor sixth
 * 9 -> major sixth
 * 10 -> minor seventh
 * 11 -> major seventh
 */

/** Lazily loaded cache of cache singletons */
const intervalCache = new Map();

export default class Interval {
  /** Should not be invoked directly -- use .create() */
  constructor(distance) {
    if (distance === undefined) {
      throw "Must supply distance!";
    }
    this.distance = distance;
  }

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
}
