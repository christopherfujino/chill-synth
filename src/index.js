import { Component, h, render } from 'preact';

//export default class App extends Component {
class App extends Component {
  render() {
    console.log("Hi from preact!");
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

render(<App />, document.body);
