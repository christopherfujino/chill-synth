import { h } from "preact";
import { render, mount } from "enzyme";
import TransportControl from "./TransportControl.jsx";

jest.mock("tone", () => {
  const Transport = {
    "bpm": {"value": 123},
  };
  // Works and lets you check for constructor calls:
  return {
    "Transport": Transport,
  };
});

describe("<TransportControl />", () => {
  describe("static rendering", () => {
    it("succeeds", () => {
      render(<TransportControl />);
    });

    it("succeeds with a single input", () => {
      const wrapper = render(<TransportControl />);
      const inputs = wrapper.find("input");
      expect(inputs).toHaveLength(1);
    });
  });

  describe("full dom rendering", () => {
    it("onInput changes state", () => {
      const wrapper = mount(<TransportControl />);
      const input = wrapper.find("input").first();
      expect(wrapper.state("bpm")).toBe(123);
      expect(input.getDOMNode().value).toBe("123");
      // For now, preact-enzyme adapter emits real DOM events, thus we need
      // to actually mutate DOM nodes.
      input.getDOMNode().value = 11;
      input.simulate("input");
      expect(wrapper.state("bpm")).toBe(11);
    });
  });
});
