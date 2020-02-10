import * as Tone from "tone";

console.log("About to play a note...");

// create a synth and connect it to master output
// default options:
// {
//   oscillator : {
//     type : triangle
//   },
//   envelope : {
//     attack : 0.005 ,
//     decay : 0.1 ,
//     sustain : 0.3 ,
//     release : 1
//   }
// }

/** Get a random integer from 0 to [max] */
function takeRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getANote() {
  const scale = ["C", "D", "E", "F", "G", "A", "B"];
  const note = takeRandom(scale);
  return `${note}3`;
}

const playButton = document.querySelector("#play-button");
const synth = new Tone.Synth().toMaster();

// play an eighth note middle 'C'
const loop = new Tone.Loop((time) => {
  synth.triggerAttackRelease(getANote(), "8n", time);
}, "4n");
//loop.start("1m").stop("4m");
loop.start(0);

let isPlaying = false;
playButton.addEventListener("click", () => {
  if (isPlaying) {
    console.log("Pausing playback.");
    Tone.Transport.pause();
  } else {
    console.log("Play tone!");
    // Tone.Transport is the timekeeper
    Tone.Transport.start();
  }
  isPlaying = !isPlaying;
});

//class AudioPlayer {
//  constructor (
//    audioContext,
//    oscillator,
//    playButton,
//    volumeControl
//  ) {
//    this.audioContext = audioContext;
//    /** This is a VCO */
//    this.oscillator = oscillator;
//    /** This is a DOM input tag */
//    this.playButton = playButton;
//    /** This is a VCA */
//    this.gainNode = audioContext.createGain();
//    this.oscillator.connect(this.gainNode)
//      .connect(audioContext.destination);
//    this.oscillator.type = "sine";
//    this.oscillator.frequency.value = 440;
//    this.oscillator.start(0);
//    this.volumeControl = volumeControl;
//
//    this.init();
//  }
//
//  /** Set up callbacks */
//  init() {
//    const {
//      audioContext,
//      gainNode,
//      playButton,
//      volumeControl
//    } = this;
//    console.log("Initializing audio player...");
//
//    volumeControl.addEventListener("input", () => {
//      gainNode.gain.value = volumeControl.value;
//    });
//
//    playButton.addEventListener("click", function() {
//      console.log("clicked!");
//      // check if context is in suspended state (autoplay policy)
//      if (audioContext.state === "suspended") {
//        audioContext.resume();
//      } else if (audioContext.state === "running") {
//        audioContext.suspend();
//      }
//    });
//  }
//  /** AudioPlayer generator that creates dependencies and passes them to the
//    * constructor */
//  static createAudioPlayer() {
//    const audioContext = new AudioContext(),
//      oscillator = audioContext.createOscillator();
//
//    return new AudioPlayer(
//      audioContext,
//      oscillator,
//      document.querySelector("button"),
//      document.querySelector("#volume")
//    );
//  }
//}
//AudioPlayer.createAudioPlayer();
