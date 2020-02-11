import * as Tone from "tone";
import Chord from "./chord.js";
import Note from "./note.js";

console.log("About to play a note...");

const playButton = document.querySelector("#play-button");
const rootNote = Note.create(48); // C3
const chord = Chord.minorChord(rootNote);

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
  const note = chord.takeRandom();
  console.log(note.toString());
  synth.triggerAttackRelease(note.toString(), "8n", time);
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
