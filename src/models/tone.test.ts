import { Tone } from "./tone";

describe("Tone", () => {
  beforeEach(() => {
    Tone.resetCache();
  });

  it(".toString() returns valid string", () => {
    const tone = new Tone(0);

    expect(tone.toString()).toBe("C");
  });

  it("Constructing a Tone with a tone greater than 11 returns valid toneNumber", () => {
    const tone = new Tone(12);

    expect(tone.toneNumber).toBe(0);
  });
});
