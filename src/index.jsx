import { Component, h, render } from "preact";
import ArpSynth from "./components/ArpSynth.jsx";
import TransportControl from "./components/TransportControl.jsx";

export class App extends Component {
  render(props) {
    return (
      <div>
        <h1>{props.title}</h1>
        <ArpSynth />
        <TransportControl />
      </div>
    );
  }
}

render(<App title="Welcome!" />, document.body);
