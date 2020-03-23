import { h } from "preact";
import { render, shallow } from "enzyme";
import ArpSynth from "./ArpSynth.jsx";

jest.mock("tone", () => {
  const Loop = jest.fn().mockImplementation(() => {
    return {"start": jest.fn()};
  });
  const PolySynth = jest.fn().mockImplementation(() => {
    return {
      "toDestination": jest.fn(() => {
        return {"get": jest.fn(() => ({"oscillator": {"type": "sawtooth"}}))};
      }),
    };
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
      render(
        <ArpSynth
          audioContextStarted={false}
          updateAudioContext={() => null}
        />
      );
    });

    it("fails if not passed audioContextStarted prop", () => {
      expect(() => render(
        <ArpSynth updateAudioContext={() => null} />)
      ).toThrow();
    });

    it("renders first time paused", () => {
      const synth = render(
        <ArpSynth
          audioContextStarted={false}
          updateAudioContext={() => null}
        />);
      expect(synth.text()).toMatch(RegExp("[Pp]ause"));
    });
  });

  describe("shallow rendering", () => {
    it("succeeds with buttons", () => {
      const wrapper = shallow(
        <ArpSynth
          audioContextStarted={false}
          updateAudioContext={() => null}
        />
      );
      expect(wrapper.find("button")).toHaveLength(12);
    });

    it("click", () => {
      const mock = jest.fn();
      const wrapper = shallow(
        <ArpSynth
          audioContextStarted={false}
          updateAudioContext={mock}
        />);
      wrapper.find(".play-button").simulate("click");
      expect(consoleLog).toHaveBeenCalledWith("Initiating toggle");
      expect(consoleLog).toHaveBeenCalledWith("Play tone!");
      expect(mock.mock.calls.length).toBe(1);
    });
  });
});
