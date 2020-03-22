import { Component, h } from "preact";
import * as Tonejs from "tone";

export default class TransportControl extends Component {
  constructor() {
    super();

    this.changeBpm = this.changeBpm.bind(this);

    this.state = {
      "bpm": Tonejs.Transport.bpm.value,
    };
  }

  changeBpm(event) {
    const nextBpm = event.target.value;
    this.setState(() => {
      Tonejs.Transport.bpm.value = nextBpm;
      return {"bpm": nextBpm};
    });
  }

  render(_, state) {
    const bpmNum = state.bpm;
    const { changeBpm } = this;

    return (
      <div>
        <h3>Transport Control</h3>
        <div>
          <label>BPM {bpmNum}</label>
          <input
            type="range"
            id="volume"
            name="volume"
            onInput={changeBpm}
            min="0"
            max="255"
            value={bpmNum}
          />
        </div>
      </div>
    );
  }
}
