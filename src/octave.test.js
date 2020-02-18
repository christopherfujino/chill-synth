import Octave from "./octave.js";

describe("Octave", () => {
  it("will throw if passed an invalid `octaveNumber`", () => {
    expect(() => new Octave()).toThrow();
    expect(() => new Octave(-2)).toThrow();
    expect(() => new Octave(11)).toThrow();
  });

  it("successfully instantiates with valid input", () => {
    const octave = new Octave(-1);
    expect(octave).toBeInstanceOf(Octave);
  });

  it(".toString() returns correct string", () => {
    const octave = new Octave(-1);
    expect(octave.toString()).toBe("-1");
  });
});
