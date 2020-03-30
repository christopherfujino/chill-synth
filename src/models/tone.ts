/** @module tone */

import Note from "./note";
import Range from "./range";

const toneMap = new Map([
  [0, "C"],
  [1, "C#"],
  [2, "D"],
  [3, "D#"],
  [4, "E"],
  [5, "F"],
  [6, "F#"],
  [7, "G"],
  [8, "G#"],
  [9, "A"],
  [10, "A#"],
  [11, "B"],
]);

const toneCache = new Map();

const TONES_IN_OCTAVE = 12;

/** One of the 12 tones. */
export default class Tone {
  /** Create a new Tone. Prefer Tone.create(), as it lazily loads.
   *
   * @param {number} toneNumber - A number between 0 and 11, mapping to the chromatic scale. */
  constructor(toneNumber: number) {
    if (toneNumber < 0 || toneNumber > TONES_IN_OCTAVE - 1) {
      throw new Error(`${toneNumber} is not a valid toneNumber (0-11)!`);
    }
    this.toneNumber = toneNumber;
  }

  toneNumber: number;

  /**
   * Get name for this tone.
   *
   * @returns {string} The string representing this tone.
   */
  toString(): string {
    const toneValue = toneMap.get(this.toneNumber);
    if (toneValue === undefined) {
      throw new Error(`Invalid toneNumber ${this.toneNumber}`);
    }
    return toneValue;
  }

  /** Given a Range, find all notes matching this tone within the range.
   *
   * @param {Range} range Range notes must be within.
   * @returns {Note[]} Array of all matching notes within the range. */
  findNotesFromRange(range: Range): Note[] {
    const notes: Note[] = [];
    // TODO: code smell, implementation leakage
    const startNum = range.startNote.midiNumber;
    const endNum = range.endNote.midiNumber;
    const startTone = range.startNote.tone;
    let distance = this.toneNumber - startTone.toneNumber;
    // distance should be between 0 and 11
    if (distance < 0) {
      distance = distance + TONES_IN_OCTAVE;
    }
    for (let cur = startNum + distance; cur < endNum; cur += TONES_IN_OCTAVE) {
      notes.push(Note.create(cur));
    }
    return notes;
  }

  /**
   * Will return cached instance first if it exists.
   *
   * @param {number} toneNumber A number between 0 and 11, mapping to the chromatic scale.
   * @returns {Tone} A lazily-loaded Tone.
   */
  static create(toneNumber: number): Tone {
    if (toneCache.has(toneNumber)) {
      return toneCache.get(toneNumber);
    }
    if (toneNumber >= TONES_IN_OCTAVE) {
      toneNumber = toneNumber % TONES_IN_OCTAVE;
    }
    const tone = new Tone(toneNumber);
    toneCache.set(toneNumber, tone);
    return tone;
  }

  /** For testing. */
  static resetCache(): void {
    toneCache.clear();
  }
}
