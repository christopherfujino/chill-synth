import { Tone } from "./tone";

describe("Tone", () => {
  beforeEach(() => {
    Tone.resetCache();
  });

  it(".toString() returns valid string", () => {
    const tone = new Tone(0);

    expect(tone.toString()).toBe("C");
  });
});
