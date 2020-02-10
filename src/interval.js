import Note from "./note.js";

export default class Interval {
  constructor(distance) {
    if (distance === undefined) {
      throw "Must supply distance!";
    }
    this.distance = distance;
  }

  /** Given a sourceNote, returns a new Note this interval away*/
  getNote(sourceNote) {
    return new Note(sourceNote.midiNumber + this.distance);
  }
}
