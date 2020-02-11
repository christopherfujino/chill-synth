import Note from "./note.js";

/** Lazily loaded cache of interval singletons */
const intervalCache = new Map();

/**
 * 0 -> unison
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
 * 12 -> octave
 */
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
}
