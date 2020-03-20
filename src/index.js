import { Component, h, render } from "preact";
import * as Tonejs from "tone";
import Chord from "./models/chord.js";
import Note from "./models/note.js";
import Range from "./models/range.js";
import Tone from "./models/tone.js";

//export default class App extends Component {
class App extends Component {
  constructor() {
    super();

    this.state = {
      currentNote: "",
      isPlaying: false,
    };
  }

  componentDidMount() {
    console.log("About to play a note...");

    const playButton = document.querySelector("#play-button");

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

    playButton.addEventListener("click", () => {
      if (this.state.isPlaying) {
        Tonejs.Transport.pause();
        console.log("Pausing playback.");
      } else {
        // Tone.Transport is the timekeeper
        Tonejs.Transport.start();
        console.log("Play tone!");
      }
      this.setState({"isPlaying": !this.state.isPlaying});
    });
  }

  render(_, state) {
    return (
      <div>
        <h1>Welcome!</h1>
        <h2>{state.currentNote}</h2>
        <button
          id="play-button"
          data-playing="false"
          role="switch"
          aria-checked="false">
          <span>Play/Pause</span>
        </button>
      </div>
    );
  }
}

render(<App />, document.body);
