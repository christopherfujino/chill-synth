import Note from "./note.js";

const chordCache = new Map();

export default class Chord {
  constructor(notes) {
    if (notes === undefined) {
      throw "An array of notes must be provided";
    }
    this.notes = notes;
  }

  static create(notes) {
    const key = Chord.hashNotes(notes);
    if (chordCache.has(key)) {
      return chordCache.get(key);
    }
    const chord = new Chord(notes);
    chordCache.set(key, chord);
    return chord;
  }

  static hashNotes(notes) {
    return notes.reduce((acc, cur) => `${acc}${cur.toString()}`);
  }

  static fromCodes(numbers) {
    return Chord.create(numbers.map((num) => Note.create(num)));
  }
}
