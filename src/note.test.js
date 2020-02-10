import Note from "./note.js";

describe("Note", () => {
  it("constructs without exception", () => {
    const note = new Note();
    expect(note).toBeInstanceOf(Note);
  });

  it(".toString() returns a valid String", () => {
    const note = new Note();
    const toString = note.toString();
    expect(typeof toString).toBe("string");
  });

  it(".midiNumber defaults to 0", () => {
    const note = new Note();
    expect(note.midiNumber).toEqual(0);
  });
});
