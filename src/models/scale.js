/** @module scale */

import { takeRandom } from "../utils.js";
import Tone from "./tone.js";

/** A sequence of seven Notes. */
export default class Scale {
  /** TODO allow specifying a key. */
  constructor() {
    // c, d, e, f, g, a, b
    this.tones = [0, 2, 4, 5, 7, 9, 11].map((num) => Tone.create(num));
  }

  /**
   * Return a random tone from this scale.
   *
   * @returns {Tone} - A random tone within this scale.
   */
  getTone() {
    return takeRandom(this.tones);
  }

  /** For testing. */
  static resetCache() {
    // TODO implement once a cache is set
  }
}
