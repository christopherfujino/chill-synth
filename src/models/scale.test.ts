import Scale from "./scale";
import { Tone } from "./tone";

describe("Scale", () => {
  afterEach(() => {
    Tone.resetCache();
    Scale.resetCache();
  });

  it("constructs successfully", () => {
    const scale = new Scale();
    expect(scale).toBeInstanceOf(Scale);
  });

  it("scale.tones should be an array of strings", () => {
    const scale = new Scale();
    expect(Array.isArray(scale.tones)).toBe(true);
  });

  it(".getTone() returns a valid tone", () => {
    const scale = new Scale();
    const tone = scale.getTone();
    expect(tone).toBeInstanceOf(Tone);
  });
});
