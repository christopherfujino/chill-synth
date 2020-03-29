import Chord from "./chord";
import Note from "./note";
import Range from "./range";
import Tone from "./tone";

describe("Chord", () => {
  afterEach(() => {
    Chord.resetCache();
  });

  it("throws an exception if constructor is invoked without any arguments", () => {
    expect(() => new Chord()).toThrow();
  });

  it("constructs successfully if passed an Array of tones", () => {
    const chord = new Chord([new Tone(0), new Tone(3), new Tone(7)]);
    expect(chord).toBeInstanceOf(Chord);
  });

  it(".create() returns the same instance if invoked twice with same input", () => {
    const tones = [new Tone(0), new Tone(3), new Tone(7)];
    const firstChord = Chord.create(tones);
    const secondChord = Chord.create(tones);
    expect(firstChord).toBeInstanceOf(Chord);
    expect(firstChord).toBe(secondChord);
  });

  it("static .hashTones() returns expected output", () => {
    const tones = [new Tone(0), new Tone(3), new Tone(7)];
    const hash = Chord.hashTones(tones);
    expect(hash).toBe("CD#G");
  });

  it("getter .hashString returns expected output", () => {
    const chord = Chord.majorChord(new Tone(2));
    expect(chord.hashString).toBe("DF#A");
  });

  it(".minorChord() returns chords with correct hashString", () => {
    const chord = Chord.minorChord(new Tone(3));
    expect(chord.hashString).toBe("D#F#A#");
  });

  it("lazy loaded .hashString getter returns the same value if invoked twice", () => {
    const chord = new Chord([new Tone(0), new Tone(3), new Tone(7)]);
    const hash1 = chord.hashString;
    const hash2 = chord.hashString;
    expect(hash1).toBe(hash2);
  });

  it(".takeRandomInRange() returns a tone within the chord", () => {
    const tones = [new Tone(0), new Tone(3), new Tone(7)];
    const chord = new Chord(tones);
    const range = new Range(new Note(3), new Note(33));
    const takenNote = chord.takeRandomInRange(range);
    expect(tones.map((tone) => tone.toneNumber).includes(takenNote.tone.toneNumber)).toBe(true);
  });
});
