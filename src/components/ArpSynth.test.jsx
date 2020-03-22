import { h } from "preact";
import { render, shallow } from "enzyme";
import ArpSynth from "./ArpSynth.jsx";

jest.mock("tone", () => {
  const Loop = jest.fn().mockImplementation(() => {
    return {"start": jest.fn()};
  });
  const PolySynth = jest.fn().mockImplementation(() => {
    return {"toDestination": jest.fn()};
  });
  const Transport = {
    "pause": jest.fn(),
    "start": jest.fn(),
  };
  // Works and lets you check for constructor calls:
  return {
    "start": jest.fn(),
    "Loop": Loop,
    "PolySynth": PolySynth,
    "Transport": Transport,
  };
});

describe("<ArpSynth />", () => {
  let consoleLog;
  beforeEach(() => {
    consoleLog = jest.fn();
    global.console = {
      "log": consoleLog,
    };
  });

  describe("static rendering", () => {
    it("succeeds", () => {
      render(<ArpSynth />);
    });

    it("renders first time paused", () => {
      const synth = render(<ArpSynth />);
      expect(synth.text()).toMatch(RegExp("[Pp]ause"));
    });
  });

  describe("shallow rendering", () => {
    it("succeeds with 4 buttons", () => {
      const wrapper = shallow(<ArpSynth />);
      expect(wrapper.find("button")).toHaveLength(4);
    });

    it("click", () => {
      const wrapper = shallow(<ArpSynth />);
      wrapper.find(".play-button").simulate("click");
      expect(consoleLog).toHaveBeenCalledWith("Initiating toggle");
      expect(consoleLog).toHaveBeenCalledWith("Play tone!");
    });
  });
});
