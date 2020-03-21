import { Component, h } from "preact";
import * as Tonejs from "tone";
import Chord from "../models/chord.js";
import Note from "../models/note.js";
import Range from "../models/range.js";
import Tone from "../models/tone.js";

export default class ArpSynth extends Component {
  constructor() {
    super();

    this.toggleIsPlaying = this.toggleIsPlaying.bind(this);

    this.state = {
      currentNote: "",
      isPlaying: false,
    };
  }

  componentDidMount() {
    const synthOptions = {
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

    const arpeggio = new Tonejs.Synth(synthOptions).toMaster();

    const rootTone = Tone.create(0); // C
    const chord = Chord.minorChord(rootTone);
    const range = Range.create(Note.create(36), Note.create(90));

    const loop = new Tonejs.Loop((time) => {
      const note = chord.takeRandomInRange(range);
      this.setState({"currentNote": note.toString()});
      arpeggio.triggerAttackRelease(note.toString(), "8n", time);
    }, "4n");

    loop.start(0);
  }

  toggleIsPlaying() {
    console.log("toggle time!");

    const {isPlaying} = this.state;

    if (isPlaying) {
      Tonejs.Transport.pause();
      console.log("Pausing playback.");
    } else {
      // Tone.Transport is the timekeeper
      Tonejs.Transport.start();
      console.log("Play tone!");
    }
    this.setState({"isPlaying": !isPlaying});
  }

  render(_props, state) {
    const {toggleIsPlaying} = this;
    return (
      <div>
        <h3>My Great Synth</h3>
        <div>{state.currentNote}</div>
        <button
          id="play-button"
          data-playing="false"
          onClick={toggleIsPlaying}
          role="switch"
          aria-checked="false">
          Play/Pause
        </button>
      </div>
    );
  }
}
