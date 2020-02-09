import * as Tone from "tone";

class AudioPlayer {
  constructor (
    audioContext,
    oscillator,
    playButton,
    volumeControl
  ) {
    this.audioContext = audioContext;
    /** This is a VCO */
    this.oscillator = oscillator;
    /** This is a DOM input tag */
    this.playButton = playButton;
    /** This is a VCA */
    this.gainNode = audioContext.createGain();
    this.oscillator.connect(this.gainNode)
      .connect(audioContext.destination);
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = 440;
    this.oscillator.start(0);
    this.volumeControl = volumeControl;

    this.init();
  }

  /** Set up callbacks */
  init() {
    const {
      audioContext,
      gainNode,
      playButton,
      volumeControl
    } = this;
    console.log("Initializing audio player...");

    volumeControl.addEventListener("input", () => {
      gainNode.gain.value = volumeControl.value;
    });

    playButton.addEventListener("click", function() {
      console.log("clicked!");
      // check if context is in suspended state (autoplay policy)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      } else if (audioContext.state === "running") {
        audioContext.suspend();
      }
    });
  }
  /** AudioPlayer generator that creates dependencies and passes them to the
    * constructor */
  static createAudioPlayer() {
    const audioContext = new AudioContext(),
      oscillator = audioContext.createOscillator();

    return new AudioPlayer(
      audioContext,
      oscillator,
      document.querySelector("button"),
      document.querySelector("#volume")
    );
  }
}

//AudioPlayer.createAudioPlayer();
