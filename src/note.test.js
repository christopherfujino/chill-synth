import Note from "./note.js";

describe("Note", () => {
  it("constructs without exception", () => {
    const note = new Note();
    expect(note).toBeInstanceOf(Note);
  });

  it(".midiNumber defaults to 0", () => {
    const note = new Note();
    expect(note.midiNumber).toEqual(0);
  });

  it(".toString() returns a valid String", () => {
    const note = new Note(0);
    const toString = note.toString();
    expect(typeof toString).toBe("string");
    expect(toString).toBe("C-1");
  });

  it(".toString() does not throw for midiNumbers 0-127 and is always unique", () => {
    const set = new Set();
    for (let i = 0; i < 128; i++) {
      const note = new Note(i);
      const toString = note.toString();
      expect(set.has(toString)).toBe(false);
      set.add(toString);
      expect(typeof toString).toBe("string");
    }
  });
});
