import Interval from "./interval.js";
import Note from "./note.js";

describe("interval", () => {
  it("throws if no distance provided to constructor", () => {
    expect(() => new Interval()).toThrow();
  });

  it("constructs successfully", () => {
    const interval = new Interval(1);
    expect(interval).toBeInstanceOf(Interval);
  });

  it(".getNote() returns a new Note distance semitones away", () => {
    const minorThird = new Interval(3);
    const cNote = new Note(0);
    expect(cNote.midiNumber).toBe(0);
    const eFlatNote = minorThird.getNote(cNote);
    expect(eFlatNote).toBeInstanceOf(Note);
    expect(eFlatNote.midiNumber).toBe(3);
  });

  it(".create() returns the same instance if invoked twice with the same input", () => {
    const distance = 3;
    const firstInterval = Interval.create(distance);
    const secondInterval = Interval.create(distance);
    expect(firstInterval).toBe(secondInterval);
  });
});
