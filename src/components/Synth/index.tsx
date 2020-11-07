import { Component, ComponentChild, h } from "preact";
import * as Tonejs from "tone";
import Chord from "../../models/chord";
import Note from "../../models/note";
import Range from "../../models/range";
import { Tone } from "../../models/tone";

interface Props {
  audioContextStarted: boolean;
  updateAudioContext: (started: boolean) => void;
}

interface Adsr {
  attack: string;
  decay: string;
  sustain: string;
  release: string;
}

interface State {
  adsr: Adsr;
  chord: Chord;
  chords: Chord[];
  isPlaying: boolean;
  waveform: string;
}

/** Polyphonic Synth instance, with controls. */
export default class Synth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateOscillator = this.updateOscillator.bind(this);
    this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
    this.updateEnvelope = this.updateEnvelope.bind(this);

    this.synth = new Tonejs.PolySynth(
      Tonejs.Synth,
      {
        "oscillator": {
          "type": "sawtooth",
        },
        "envelope": {
          "attack": 0.025,
          "decay": 0.175,
          "sustain": 0,
          "release": 0.75,
        },
      }
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
                onClick={(): void => this.setState({"chord": chord})}
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
            onClick={(): void => this.updateOscillator(shape as OscillatorType)}
          >
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
      waveform: synthAttributes.oscillator.type,
    };

    /** Ticks per beat */
    const TICKS = 50;

    const ode = [
      ["E4", 0, 1],
      ["E4", 2, 1],
      ["F4", 4, 1],
      ["G4", 6, 1],
      ["G4", 8, 1],
      ["F4", 10, 1],
      ["E4", 12, 1],
      ["D4", 14, 1],
      ["C4", 16, 1],
      ["C4", 18, 1],
      ["D4", 20, 1],
      ["E4", 22, 1],
      ["E4", 24, 0.5],
      ["D4", 27, 0.5],
      ["D4", 28, 2],
    ];

    let odeIndex = 0;
    let tick = 0;

    const loop = new Tonejs.Loop(
      (time: number): void => {
        console.log("time", time);
        const note = ode[odeIndex];
        console.log(note && `tick: ${tick}\tindex: ${odeIndex}\t length: ${note[2] as number * TICKS}`);
        if (note !== undefined && tick === note[1]) {
          this.synth.triggerAttackRelease(note[0], `${note[2] as number * TICKS}i`, time);
          odeIndex += 1;
        }
        // Increment
        tick += 1;
        if (tick === 32) {
          tick = 0;
          odeIndex = 0;
        }
      },
      `${TICKS}i`,
    );

    loop.start(0); // start loop at beginning of timeline
  }

  oscillatorWaveFormSelectors: ComponentChild;
  chordInterface: ComponentChild;
  range: Range;
  synth: Tonejs.PolySynth;

  updateOscillator(waveform: OscillatorType): void {
    this.setState(() => {
      this.synth.set({
        "oscillator": {
          "type": waveform,
        },
      });

      return {"waveform": waveform};
    });
  }

  updateEnvelope(field: string, value: string): void {
    console.log(field);
    console.log(value);
    this.setState((prevState: State) => {
      const newAdsr = Object.assign(new Object(), prevState.adsr, {[field]: value});
      this.synth.set({
        "envelope": newAdsr
      });

      return {"adsr": newAdsr};
    });
  }

  toggleIsPlaying(): void {
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
    this.setState((prevState: State) => {
      return {"isPlaying": !prevState.isPlaying};
    });
  }

  render(props: Props, state: State): ComponentChild {
    const {toggleIsPlaying} = this;
    const {waveform} = state,
      { audioContextStarted } = props;
    return (
      <div>
        <h3>My Great Synth</h3>
        <div className="audio-context-indicator">Tonejs: {audioContextStarted ? "on" : "off"}</div>
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
                    onInput={
                      (e): void =>
                        this.updateEnvelope(
                          field,
                          (e.target as HTMLInputElement).value)}
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
