/** Get a random integer from 0 to [max] */
function takeRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
