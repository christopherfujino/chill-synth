import { Component, h, render } from "preact";
import ArpSynth from "./components/ArpSynth.jsx";

//export default class App extends Component {
class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <ArpSynth />
      </div>
    );
  }
}

render(<App />, document.body);
