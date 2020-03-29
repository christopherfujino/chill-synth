import Note from "./note";
import Range from "./range";

describe("Range", () => {
  afterEach(() => {
    Range.resetCache();
  });

  it("constructs successfully when passed two Notes", () => {
    const range = new Range(new Note(0), new Note(10));
    expect(range).toBeInstanceOf(Range);
  });

  it("throws an exception when startNote is greater than endNote", () => {
    expect(() => new Range(new Note(1), new Note(0))).toThrow();
  });

  it(".toString() returns correct output", () => {
    const range = new Range(new Note(29), new Note(36));
    const string = range.toString();
    expect(string).toBe("F1 - C2");
  });

  it(".create() invoked twice with same arguments yields same instance", () => {
    const note1 = new Note(0);
    const note2 = new Note(3);
    const range1 = Range.create(note1, note2);
    const range2 = Range.create(note1, note2);
    expect(range1).toBe(range2);
  });
});
