import * as Tone from "tone";
import Scale from "./scale.js";

console.log("About to play a note...");

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
