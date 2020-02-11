import Note from "./note.js";

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
