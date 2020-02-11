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

// Cache note singletons
const noteCache = new Map();

export default class Note {
  /**Should not be invoked directly, instead use .create()*/
  constructor(midiNumber) {
    if (midiNumber === undefined) {
      throw "You must provide a midiNumber when constructing a Note";
    }
    this.midiNumber = midiNumber;
  }

  /** Will return cached instance first if it exists */
  static create(midiNumber) {
    if (noteCache.has(midiNumber)) {
      return noteCache.get(midiNumber);
    }
    const note = new Note(midiNumber);
    noteCache.set(midiNumber, note);
    return note;
  }

  // https://tonejs.github.io/docs/13.8.25/Type#frequency
  toString() {
    const tone = this.midiNumber % 12;
    const toneLetter = toneMap.get(tone);
    // MIDI numbering starts from -1 octave
    const octave = Math.floor(this.midiNumber / 12) - 1;
    return `${toneLetter}${octave}`;
  }
}
