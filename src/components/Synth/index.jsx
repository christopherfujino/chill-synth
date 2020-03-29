import { Component, h } from "preact";
import * as Tonejs from "tone";
import Chord from "../../models/chord";
import Note from "../../models/note";
import Range from "../../models/range";
import Tone from "../../models/tone";

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

export default class Synth extends Component {
  constructor(props) {
    if (props.audioContextStarted === undefined) {
      throw new Error("Must provide audioContextStarted prop");
    }
    if (props.updateAudioContext === undefined) {
      throw new Error("Must provide updateAudioContext");
    }
    super(props);

    this.updateOscillator = this.updateOscillator.bind(this);
    this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
    this.updateEnvelope = this.updateEnvelope.bind(this);

    this.synth = new Tonejs.PolySynth(
      Tonejs.MonoSynth,
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
            onClick={() => this.updateOscillator(shape)}>
            {shape}
          </button>
        ))}
      </div>);

    const synthAttributes = this.synth.get();
    const envelope = synthAttributes.envelope;
    this.state = {
      adsr: {
        "attack": envelope.attack.toString(),
        "decay": envelope.decay.toString(),
        "sustain": envelope.sustain.toString(),
        "release": envelope.release.toString(),
      },
      chord: chords[0],
      chords: chords,
      isPlaying: false,
      note: null,
      waveform: synthAttributes.oscillator.type,
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

  updateOscillator(waveform) {
    this.setState(() => {
      this.synth.set({
        "oscillator": {
          "type": waveform,
        },
      });

      return {"waveform": waveform};
    });
  }

  updateEnvelope(field, value) {
    console.log(field);
    console.log(value);
    this.setState((prevState) => {
      const newAdsr = Object.assign(new Object(), prevState.adsr, {[field]: value});
      this.synth.set({
        "envelope": newAdsr
      });

      return {"adsr": newAdsr};
    });
  }

  toggleIsPlaying() {
    console.log("Initiating toggle");

    const {isPlaying} = this.state,
      {audioContextStarted, updateAudioContext} = this.props;

    if (isPlaying) {
      console.log("Pausing playback.");
      Tonejs.Transport.pause();
    } else {
      if (!audioContextStarted) {
        Tonejs.start();
        updateAudioContext(true);
      }
      // Tone.Transport is the timekeeper
      Tonejs.Transport.start();
      console.log("Play tone!");
    }
    this.setState((prevState) => {
      return {"isPlaying": !prevState.isPlaying};
    });
  }

  render(props, state) {
    const {toggleIsPlaying} = this;
    const {note, waveform} = state,
      { audioContextStarted } = props;
    const noteDescriptor = note === null ? "" : note.toString();
    return (
      <div>
        <h3>My Great Synth</h3>
        <div className="audio-context-indicator">Tonejs: {audioContextStarted ? "on" : "off"}</div>
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
        <div>
          Envelope
          {["attack", "decay", "sustain", "release"].map((field) => {
            const displayName = field.slice(0,1).toUpperCase() + field.slice(1);
            const currentValue = state.adsr[field];

            return (
              <div className="columns" key={field}>
                <div className="column col-6">
                  <label>{displayName}: {currentValue}</label>
                </div>
                <div className="column col-6">
                  <input
                    type="range"
                    onInput={(e) => this.updateEnvelope(field, e.target.value)}
                    min="0"
                    max="2"
                    step="0.025"
                    value={currentValue}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
