import * as Tone from "tone";
import Chord from "./chord.js";
import Note from "./note.js";

console.log("About to play a note...");

const playButton = document.querySelector("#play-button");

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

const synthOptions2 = {
  "oscillator": {
    "type": "square",
  },
  "envelope": {
    "attack": 0.3,
    "decay": 0.175,
    "sustain": 0.7,
    "release": 0.1,
  },
};
const arpeggio = new Tone.Synth(synthOptions).toMaster();
const bass = new Tone.Synth(synthOptions2).toMaster();

const rootNote = Note.create(48); // C3
const chord = Chord.minorChord(rootNote);

const loop = new Tone.Loop((time) => {
  const note = chord.takeRandom();
  console.log(note.toString());
  arpeggio.triggerAttackRelease(note.toString(), "8n", time);
}, "4n");

const bassNote = Note.create(36); // C2
const bassLoop = new Tone.Loop((time) => {
  bass.triggerAttackRelease(bassNote.toString(), "4n", time);
}, "2n");
loop.start(0);
bassLoop.start(0);

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
