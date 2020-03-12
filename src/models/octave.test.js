import Octave from "./octave.js";

describe("Octave", () => {
  beforeEach(() => {
    Octave.resetCache();
  });

  it("will throw if passed an invalid `octaveNumber`", () => {
    expect(() => new Octave()).toThrow();
    expect(() => new Octave(-2)).toThrow();
    expect(() => new Octave(11)).toThrow();
  });

  it("successfully instantiates with valid input", () => {
    const octave = new Octave(-1);
    expect(octave).toBeInstanceOf(Octave);
  });

  it("calling .create() twice returns the same instance", () => {
    const num = 2;
    const octave1 = new Octave(num);
    const octave2 = new Octave(num);
    expect(octave1).not.toBe(octave2);
    const octave3 = Octave.create(num);
    const octave4 = Octave.create(num);
    expect(octave3).toBe(octave4);
  });

  it(".toString() returns correct string", () => {
    const octave = new Octave(-1);
    expect(octave.toString()).toBe("-1");
  });
});
