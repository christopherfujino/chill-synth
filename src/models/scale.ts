/** @module scale */

import { takeRandom } from "../utils";
import Tone from "./tone";

/** A sequence of seven Notes. */
export default class Scale {
  /** TODO allow specifying a key. */
  constructor() {
    // c, d, e, f, g, a, b
    this.tones = [0, 2, 4, 5, 7, 9, 11].map((num) => Tone.create(num));
  }

  tones: Tone[];

  /**
   * Return a random tone from this scale.
   *
   * @returns {Tone} - A random tone within this scale.
   */
  getTone(): Tone {
    return takeRandom(this.tones);
  }

  /** For testing. */
  static resetCache(): void {
    // TODO implement once a cache is set
  }
}
