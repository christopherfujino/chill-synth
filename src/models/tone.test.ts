import Tone from "./tone";

describe("Tone", () => {
  beforeEach(() => {
    Tone.resetCache();
  });

  it("throws if no argument passed", () => {
    expect(() => new Tone()).toThrow();
  });

  it(".toString() returns valid string", () => {
    const tone = new Tone(0);

    expect(tone.toString()).toBe("C");
  });
});
