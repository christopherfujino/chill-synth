import { takeRandom } from "./utils.js";

export default class Scale {
  /** TODO allow specifying a key */
  constructor() {
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
  }

  /** Return WebAudio API compatible note string */
  getNote(octave = 4) {
    const note = takeRandom(this.scale);
    return `${note}${octave}`;
  }
}
