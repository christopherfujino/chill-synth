import Note from "./note.js";
import Scale from "./scale.js";

describe("Scale", () => {
  it("constructs successfully", () => {
    const scale = new Scale();
    expect(scale).toBeInstanceOf(Scale);
  });

  it("scale.scale should be an array of strings", () => {
    const scale = new Scale();
    expect(Array.isArray(scale.scale)).toBe(true);
  });

  it(".getNote() returns a valid WebAudio API compative note string", () => {
    const scale = new Scale();
    const note = scale.getNote();
    expect(note).toBeInstanceOf(Note);
    expect(note.toString().length).toBeGreaterThanOrEqual(2);
  });
});
