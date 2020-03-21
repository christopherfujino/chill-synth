import { h } from "preact";
import { render, shallow } from "enzyme";
import ArpSynth from "./ArpSynth.jsx";

jest.mock("tone", () => {
  const Loop = jest.fn().mockImplementation(() => {
    return {"start": jest.fn()};
  });
  const Synth = jest.fn().mockImplementation(() => {
    return {"toMaster": jest.fn()};
  });
  const Transport = {
    "pause": jest.fn(),
    "start": jest.fn(),
  };
  // Works and lets you check for constructor calls:
  return {
    "Loop": Loop,
    "Synth": Synth,
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
    it("succeeds", () => {
      const wrapper = shallow(<ArpSynth />);
      expect(wrapper.find("button")).toHaveLength(1);
    });

    it("click", () => {
      const wrapper = shallow(<ArpSynth />);
      wrapper.find(".play-button").simulate("click");
      expect(consoleLog).toHaveBeenCalledWith("Initiating toggle");
      expect(consoleLog).toHaveBeenCalledWith("Play tone!");
    });
  });
});
