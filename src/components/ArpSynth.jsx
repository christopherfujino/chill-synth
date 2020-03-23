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
    this.changeOscillator = this.changeOscillator.bind(this);

    this.synth = new Tonejs.PolySynth(
      Tonejs.Synth,
      SYNTH_OPTIONS
    ).toDestination();

    this.range = Range.create(Note.create(36), Note.create(90));

    const chords = [
      Chord.majorChord(Tone.create(0)), // C major
      Chord.minorChord(Tone.create(2)), // D minor
      Chord.minorChord(Tone.create(4)), // E minor
      Chord.majorChord(Tone.create(5)), // F major
      Chord.majorChord(Tone.create(7)), // G major
      Chord.minorChord(Tone.create(9)), // A minor
      Chord.diminished(Tone.create(11)), // B diminished
    ];

    this.chordInterface = (
      <div className="btn-group btn-group-block">
        {
          chords.map((chord) => {
            const name = chord.toString();
            return (
              <button
                className="btn"
                key={name}
                onClick={() => this.setState({"chord": chord})}
              >
                {name}
              </button>
            );
          })
        }
      </div>);

    this.oscillatorWaveFormSelectors = (
      <div className="btn-group btn-group-block">
        {[
          "sawtooth",
          "sine",
          "triangle",
          "square",
        ].map((shape) => (
          <button
            className="btn"
            key={shape}
            onClick={() => this.changeOscillator(shape)}>
            {shape}
          </button>
        ))}
      </div>);

    this.state = {
      audioContextStarted: false,
      chord: chords[0],
      chords: chords,
      isPlaying: false,
      note: null,
      waveform: this.synth.get().oscillator.type,
    };

    const loop = new Tonejs.Loop((time) => {
      const {chord} = this.state,
        notes = [];
      for (let i = 0; i < 3; i++) {
        notes.push(chord.takeRandomInRange(this.range).toString());
      }
      this.synth.triggerAttackRelease(notes, "8n", time);
    }, "4n");

    loop.start(0); // start loop at beginning of timeline
  }

  changeOscillator(waveform) {
    this.setState(() => {
      this.synth.set({
        "oscillator": {
          "type": waveform,
        },
      });

      return {"waveform": waveform};
    });
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
    const {audioContextStarted, note, waveform} = state;
    const noteDescriptor = note === null ? "" : note.toString();
    return (
      <div>
        <h3>My Great Synth</h3>
        <div>Tonejs: {audioContextStarted ? "on" : "off"}</div>
        <div>Current Note: {noteDescriptor}</div>
        <div>Current Chord: {state.chord.toString()}</div>
        <button
          className="play-button btn"
          onClick={toggleIsPlaying}
          role="switch">
          Play/Pause
        </button>
        <div>
          {this.chordInterface}
        </div>
        <div>
          <span>
            {waveform}
          </span>
          {this.oscillatorWaveFormSelectors}
        </div>
      </div>
    );
  }
}
