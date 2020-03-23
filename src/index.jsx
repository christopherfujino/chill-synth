import { Component, h, render } from "preact";
import Synth from "./components/Synth/index.jsx";
import TransportControl from "./components/TransportControl.jsx";
import "spectre.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.updateAudioContext = this.updateAudioContext.bind(this);

    this.state = {
      "audioContextStarted": false,
    };
  }

  updateAudioContext(started) {
    this.setState({"audioContextStarted": started});
  }

  render(props, state) {
    return (
      <div className="container">
        <div className="columns text-center">
          <div className="col-mx-auto col-8 col-lg-12">
            <h1>{props.title}</h1>
            <Synth
              audioContextStarted={state.audioContextStarted}
              updateAudioContext={this.updateAudioContext}
            />
            <TransportControl />
          </div>
        </div>
      </div>
    );
  }
}

render(<App title="Welcome!" />, document.body);
