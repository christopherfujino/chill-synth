import Chord from "./chord.js";
import Note from "./note.js";

describe("Chord", () => {
  it("throws an exception if constructor is invoked without any arguments", () => {
    expect(() => new Chord()).toThrow();
  });

  it("constructs successfully if passed an Array of notes", () => {
    const chord = new Chord([new Note(0), new Note(3), new Note(7)]);
    expect(chord).toBeInstanceOf(Chord);
  });

  it(".fromCodes() constructs a chord if passed in arrayOfNumbers", () => {
    const chord = Chord.fromCodes([0, 3, 7]);
    expect(chord).toBeInstanceOf(Chord);
  });
});
