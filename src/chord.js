import Note from "./note.js";

export default class Chord {
  constructor(notes) {
    if (notes === undefined) {
      throw "An array of notes must be provided";
    }
    this.notes = notes;
  }

  //TODO implement lazy loader
  //static create(notes);

  static fromCodes(arrayOfNumbers) {
    return new Chord(arrayOfNumbers.map((num) => Note.create(num)));
  }
}
