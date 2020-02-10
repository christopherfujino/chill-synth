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

export default class Note {
  /**Takes as an input a MIDI number (e.g. 32)*/
  constructor(midiNumber) {
    if (midiNumber === undefined) {
      throw "You must provide a midiNumber when constructing a Note";
    }
    this.midiNumber = midiNumber;
  }

  // TODO: provide alternate constructors

  // https://tonejs.github.io/docs/13.8.25/Type#frequency
  toString() {
    const tone = this.midiNumber % 12;
    const toneLetter = toneMap.get(tone);
    if (toneLetter === undefined) {
      throw `Uh oh tone == ${tone}`; // TODO test this
    }
    // MIDI numbering starts from -1 octave
    const octave = Math.floor(this.midiNumber / 12) - 1;
    return `${toneLetter}${octave}`;
  }
}
