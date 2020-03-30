import { Component, ComponentChild, h, render } from "preact";
import Synth from "./components/Synth/index";
import TransportControl from "./components/TransportControl";
import "spectre.css";

interface Props {
  title: string;
}

interface State {
  audioContextStarted: boolean;
}

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateAudioContext = this.updateAudioContext.bind(this);

    this.state = {
      "audioContextStarted": false,
    };
  }

  updateAudioContext(started: boolean): void {
    this.setState({"audioContextStarted": started});
  }

  render(props: Props, state: State): ComponentChild {
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
