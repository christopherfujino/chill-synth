import Note from "./note.js";

export default class Interval {
  constructor(distance) {
    if (distance === undefined) {
      throw "Must supply distance!";
    }
    this.distance = distance;
  }

  getNote(sourceNote) {
    return new Note(sourceNote.midiNumber + this.distance);
  }
}
