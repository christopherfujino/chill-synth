import { takeRandom } from "./utils.js";
import Note from "./note.js";

/** A sequence of seven Notes. */
export default class Scale {
  /** TODO allow specifying a key. */
  constructor() {
    // start from C3
    // https://syntheway.com/MIDI_Keyboards_Middle_C_MIDI_Note_Number_60_C4.htm
    const offset = 48;
    // c, d, e, f, g, a, b
    this.notes = [0, 2, 4, 5, 7, 9, 11].map((num) => Note.create(num + offset));
  }

  /**
   * Return a random note from this scale.
   *
   * @returns {Note} - A random note within this scale.
   */
  getNote() {
    return takeRandom(this.notes);
  }
}
