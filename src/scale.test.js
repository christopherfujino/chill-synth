import Note from "./note.js";
import Scale from "./scale.js";

describe("Scale", () => {
  afterEach(() => {
    Note.resetCache();
  });

  it("constructs successfully", () => {
    const scale = new Scale();
    expect(scale).toBeInstanceOf(Scale);
  });

  it("scale.notes should be an array of strings", () => {
    const scale = new Scale();
    expect(Array.isArray(scale.notes)).toBe(true);
  });

  it(".getNote() returns a valid WebAudio API compative note string", () => {
    const scale = new Scale();
    const note = scale.getNote();
    expect(note).toBeInstanceOf(Note);
    expect(note.toString().length).toBeGreaterThanOrEqual(2);
  });

  it("intentionally failing test", () => expect(1).toBe(2));
});
