import Note from "./note.js";
import Range from "./range.js";

describe("Range", () => {
  it("constructs successfully when passed two Notes", () => {
    const range = new Range(new Note(0), new Note(10));
    expect(range).toBeInstanceOf(Range);
  });

  it(".toString() returns correct output", () => {
    const range = new Range(new Note(29), new Note(36));
    const string = range.toString();
    expect(string).toBe("F1 - C2");
  });
});
