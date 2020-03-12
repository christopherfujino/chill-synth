import * as Tonejs from "tone";
import Chord from "./models/chord.js";
import Note from "./models/note.js";
import Octave from "./models/octave.js";
import Tone from "./models/tone.js";

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

const arpeggio = new Tonejs.Synth(synthOptions).toMaster();
const bass = new Tonejs.Synth(synthOptions2).toMaster();

const rootTone = Tone.create(0); // C3
const chord = Chord.minorChord(rootTone);
const octave = Octave.create(3);

const loop = new Tonejs.Loop((time) => {
  const tone = chord.takeRandom();
  const note = Note.fromTone(tone, octave);
  console.log(note.toString());
  arpeggio.triggerAttackRelease(note.toString(), "8n", time);
}, "4n");

const bassNote = Note.create(36); // C2
const bassLoop = new Tonejs.Loop((time) => {
  bass.triggerAttackRelease(bassNote.toString(), "4n", time);
}, "2n");
loop.start(0);
bassLoop.start(0);

let isPlaying = false;
playButton.addEventListener("click", () => {
  if (isPlaying) {
    Tonejs.Transport.pause();
    console.log("Pausing playback.");
  } else {
    // Tone.Transport is the timekeeper
    Tonejs.Transport.start();
    console.log("Play tone!");
  }
  isPlaying = !isPlaying;
});
