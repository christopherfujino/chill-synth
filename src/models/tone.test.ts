import { Tone } from "./tone";

describe("Tone", () => {
  beforeEach(() => {
    Tone.resetCache();
  });

  it("throws if invalid number passed", () => {
    expect(() => new Tone(-1)).toThrow();
  });

  it(".toString() returns valid string", () => {
    const tone = new Tone(0);

    expect(tone.toString()).toBe("C");
  });
});
