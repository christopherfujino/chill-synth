import Scale from "./scale.js";

describe("Scale", () => {
  it("constructs successfully", () => {
    const scale = new Scale();
    expect(scale).toBeDefined();
  });

  it("scale.scale should be an array of strings", () => {
    const scale = new Scale();
    expect(Array.isArray(scale.scale)).toBe(true);
  });

  it(".getNote() returns a valid WebAudio API compative note string", () => {
    const scale = new Scale();
    const noteString = scale.getNote();
    expect(typeof noteString).toBe("string");
    expect(noteString.length).toBeGreaterThanOrEqual(2);
  });
});
