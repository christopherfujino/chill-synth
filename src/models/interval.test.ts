import Interval from "./interval";
import Note from "./note";

describe("interval", () => {
  afterEach(() => {
    Interval.resetCache();
  });

  it("throws if no distance provided to constructor", () => {
    expect(() => new Interval()).toThrow();
  });

  it("constructs successfully", () => {
    const interval = new Interval(1);
    expect(interval).toBeInstanceOf(Interval);
  });

  it(".getNote() returns a new Note [distance] semitones away", () => {
    const minorThird = new Interval(3);
    const cNote = new Note(0);
    expect(cNote.midiNumber).toBe(0);
    const eFlatNote = minorThird.getNote(cNote);
    expect(eFlatNote).toBeInstanceOf(Note);
    expect(eFlatNote.midiNumber).toBe(3);
  });

  it(".create() returns the same instance if invoked twice with the same input", () => {
    const distance = 3;
    const firstInterval = Interval.create(distance);
    const secondInterval = Interval.create(distance);
    expect(firstInterval).toBe(secondInterval);
  });

  it("verify all static getters return interval of correct distance", () => {
    expect(Interval.unison.distance).toBe(0);
    expect(Interval.semitone.distance).toBe(1);
    expect(Interval.minorSecond.distance).toBe(1);
    expect(Interval.wholeTone.distance).toBe(2);
    expect(Interval.majorSecond.distance).toBe(2);
    expect(Interval.minorThird.distance).toBe(3);
    expect(Interval.majorThird.distance).toBe(4);
    expect(Interval.perfectFourth.distance).toBe(5);
    expect(Interval.tritone.distance).toBe(6);
    expect(Interval.perfectFifth.distance).toBe(7);
    expect(Interval.minorSixth.distance).toBe(8);
    expect(Interval.majorSixth.distance).toBe(9);
    expect(Interval.minorSeventh.distance).toBe(10);
    expect(Interval.majorSeventh.distance).toBe(11);
    expect(Interval.octave.distance).toBe(12);
  });
});
