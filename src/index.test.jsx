import { h } from "preact";
import { render } from "enzyme";
import { App } from "./index.jsx";

jest.mock("./components/ArpSynth.jsx");
jest.mock("./components/TransportControl.jsx");
// spectre.css is globally stubbed in jest config

describe("<App />", () => {
  describe("static render", () => {
    it("has proper title", () => {
      const title = "Hello Preact, Jest and Enzyme";
      const wrapper = render(<App title={title}/>);
      expect(wrapper.text()).toBe(title);
    });
  });
});
