import { Component, h, render } from "preact";
import ArpSynth from "./components/ArpSynth.jsx";
import TransportControl from "./components/TransportControl.jsx";

//export default class App extends Component {
class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <ArpSynth />
        <TransportControl />
      </div>
    );
  }
}

render(<App />, document.body);
