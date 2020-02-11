import Chord from "./chord.js";
import Note from "./note.js";

describe("Chord", () => {
  afterEach(() => {
    Chord.resetCache();
  });

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

  it(".create() returns the same instance if invoked twice with same input", () => {
    const notes = [new Note(0), new Note(3), new Note(7)];
    const firstChord = Chord.create(notes);
    const secondChord = Chord.create(notes);
    expect(firstChord).toBeInstanceOf(Chord);
    expect(firstChord).toBe(secondChord);
  });

  it("static .hashNotes() returns expected output", () => {
    const notes = [new Note(24), new Note(27), new Note(31)];
    const hash = Chord.hashNotes(notes);
    expect(hash).toBe("C1D#1G1");
  });

  it("getter .hashString returns expected output", () => {
    const chord = Chord.majorChord(new Note(24));
    expect(chord.hashString).toBe("C1E1G1");
  });

  it(".minorChord() returns chords with correct hashString", () => {
    const chord = Chord.minorChord(new Note(24));
    expect(chord.hashString).toBe("C1D#1G1");
  });

  it("lazy loaded .hashString getter returns the same value if invoked twice", () => {
    const chord = new Chord([new Note(24), new Note(27), new Note(31)]);
    const hash1 = chord.hashString;
    const hash2 = chord.hashString;
    expect(hash1).toBe(hash2);
  });
});
