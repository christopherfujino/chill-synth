import { Component, h } from "preact";
import * as Tonejs from "tone";
import Chord from "../models/chord.js";
import Note from "../models/note.js";
import Range from "../models/range.js";
import Tone from "../models/tone.js";

const SYNTH_OPTIONS = {
  "oscillator": {
    "type": "sawtooth",
  },
  "envelope": {
    "attack": 0.025,
    "decay": 0.175,
    "sustain": 0,
    "release": 0.75,
  },
};

export default class ArpSynth extends Component {
  constructor() {
    super();

    this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
    this.synth = new Tonejs.Synth(SYNTH_OPTIONS).toDestination();
    const chords = [
      Chord.minorChord(Tone.create(0)), // C minor
      Chord.majorChord(Tone.create(10)), // Bb major
      Chord.majorChord(Tone.create(8)), // Ab major
    ];

    this.chordInterface = chords.map((chord) => {
      const name = chord.toString();
      return (
        <button
          key={name}
          onClick={() => this.setState({"chord": chord})}
        >
          {name}
        </button>
      );
    });

    this.state = {
      audioContextStarted: false,
      chord: chords[0],
      chords: chords,
      note: null,
      isPlaying: false,
    };
  }

  componentDidMount() {
    const range = Range.create(Note.create(36), Note.create(90));

    const loop = new Tonejs.Loop((time) => {
      const note = this.state.chord.takeRandomInRange(range);
      this.setState({"note": note.toString()});
      this.synth.triggerAttackRelease(note.toString(), "8n", time);
    }, "4n");

    loop.start(0); // start loop at beginning of timeline
  }

  toggleIsPlaying() {
    console.log("Initiating toggle");

    const {audioContextStarted, isPlaying} = this.state,
      nextState = {"isPlaying": !isPlaying};

    if (isPlaying) {
      console.log("Pausing playback.");
      Tonejs.Transport.pause();
    } else {
      if (!audioContextStarted) {
        Tonejs.start();
        nextState["audioContextStarted"] = true;
      }
      // Tone.Transport is the timekeeper
      Tonejs.Transport.start();
      console.log("Play tone!");
    }
    this.setState(nextState);
  }

  render(_props, state) {
    const {toggleIsPlaying} = this;
    const {audioContextStarted, note} = state;
    const noteDescriptor = note === null ? "" : note.toString();
    return (
      <div>
        <h3>My Great Synth</h3>
        <div>Tonejs: {audioContextStarted ? "on" : "off"}</div>
        <div>Current Note: {noteDescriptor}</div>
        <div>Current Chord: {state.chord.toString()}</div>
        <button
          className="play-button"
          onClick={toggleIsPlaying}
          role="switch">
          Play/Pause
        </button>
        {this.chordInterface}
      </div>
    );
  }
}
