import { Component, h, render } from "preact";
import ArpSynth from "./components/ArpSynth.jsx";
import TransportControl from "./components/TransportControl.jsx";
import "spectre.css";

export class App extends Component {
  render(props) {
    return (
      <div className="container">
        <div className="columns text-center">
          <div className="col-mx-auto col-8 col-lg-12">
            <h1>{props.title}</h1>
            <ArpSynth
              audioContextStarted={false}
            />
            <TransportControl />
          </div>
        </div>
      </div>
    );
  }
}

render(<App title="Welcome!" />, document.body);
