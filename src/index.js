import * as Tone from "tone";

console.log("About to play a note...");

/** Get a random integer from 0 to [max] */
function takeRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

class Scale {
  constructor() {
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
  }

  getNote(octave = 4) {
    const note = takeRandom(this.scale);
    return `${note}${octave}`;
  }
}

const playButton = document.querySelector("#play-button");
const scale = new Scale();

const synthOptions = {
  "oscillator": {
    "type": "sawtooth",
  },
  "envelope": {
    "attack": 0.05,
    "decay": 0.175,
    "sustain": 0,
    "release": 0.75,
  },
};
const synth = new Tone.Synth(synthOptions).toMaster();

const loop = new Tone.Loop((time) => {
  synth.triggerAttackRelease(scale.getNote(), "8n", time);
}, "4n");
loop.start(0);

let isPlaying = false;
playButton.addEventListener("click", () => {
  if (isPlaying) {
    Tone.Transport.pause();
    console.log("Pausing playback.");
  } else {
    // Tone.Transport is the timekeeper
    Tone.Transport.start();
    console.log("Play tone!");
  }
  isPlaying = !isPlaying;
});
