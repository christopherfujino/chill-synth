/** @module tone */

import Note from "./note";
import Range from "./range";

const toneMap = new Map<number, string>([
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

/** Only sharp accidentals included, since each enum member must be unique. */
export enum Name {
  C = 0,
  CSharp,
  D,
  DSharp,
  E,
  F,
  FSharp,
  G,
  GSharp,
  A,
  ASharp,
  B,
}

const toneCache = new Map<Name, Tone>();

const TONES_IN_OCTAVE = 12;

/** One of the 12 tones. */
export class Tone {
  /** Create a new Tone. Prefer Tone.create(), as it lazily loads.
   *
   * @param name Descriptor of the tone. */
  constructor(name: Name) {
    this.toneNumber = name;
  }

  toneNumber: number;

  /**
   * Get name for this tone.
   *
   * @returns The string representing this tone.
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
   * @param range Range notes must be within.
   * @returns Array of all matching notes within the range. */
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
   * @param name A number between 0 and 11, mapping to the chromatic scale.
   * @returns A lazily-loaded Tone.
   */
  static create(name: Name): Tone {
    let cached = toneCache.get(name);
    if (cached === undefined) {
      cached = new Tone(name);
      toneCache.set(name, cached);
    }
    return cached;
  }

  /** For testing. */
  static resetCache(): void {
    toneCache.clear();
  }
}
