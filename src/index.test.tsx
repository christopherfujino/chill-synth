import { h } from "preact";
import { render } from "enzyme";
import { App } from "./index";

jest.mock("./components/Synth/index");
jest.mock("./components/TransportControl");
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
