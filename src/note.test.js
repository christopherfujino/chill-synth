import Note from "./note.js";

describe("Note", () => {
  it("throws an exception when no constructor arg provided", () => {
    expect(() => new Note()).toThrow();
  });

  it("constructs without exception when midiNumber provided", () => {
    const note = new Note(3);
    expect(note).toBeInstanceOf(Note);
    expect(note.midiNumber).toBe(3);
  });

  it(".toString() returns a valid String", () => {
    const note = new Note(0);
    const toString = note.toString();
    expect(typeof toString).toBe("string");
    expect(toString).toBe("C-1");
  });

  it(".toString() is always unique for input 0-127", () => {
    const set = new Set();
    for (let i = 0; i < 128; i++) {
      const note = new Note(i);
      const toString = note.toString();
      expect(typeof toString).toBe("string");
      expect(set.has(toString)).toBe(false);
      set.add(toString);
    }
  });

  it(".create() will return the same instance if invoked twice with the same input", () => {
    const midiNumber = 13;
    const firstNote = Note.create(midiNumber);
    const secondNote = Note.create(midiNumber);
    expect(firstNote).toBe(secondNote);
  });
});
