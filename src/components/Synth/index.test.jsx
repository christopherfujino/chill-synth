import { h } from "preact";
import { render, shallow } from "enzyme";
import Synth from "./index.jsx";

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

describe("<Synth />", () => {
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
        <Synth
          audioContextStarted={false}
          updateAudioContext={() => null}
        />
      );
    });

    it("fails if not passed audioContextStarted prop", () => {
      expect(() => render(
        <Synth updateAudioContext={() => null} />)
      ).toThrow();
    });

    it("renders text reflecting audioContextStarted prop", () => {
      const synth = render(
        <Synth
          audioContextStarted={false}
          updateAudioContext={() => null}
        />);
      expect(synth.find("div.audio-context-indicator").text()).toBe("Tonejs: off");
    });
  });

  describe("shallow rendering", () => {
    it("succeeds with buttons", () => {
      const wrapper = shallow(
        <Synth
          audioContextStarted={false}
          updateAudioContext={() => null}
        />
      );
      expect(wrapper.find("button")).toHaveLength(12);
    });

    it("click", () => {
      const mock = jest.fn();
      const wrapper = shallow(
        <Synth
          audioContextStarted={false}
          updateAudioContext={mock}
        />);
      wrapper.find("button.play-button").simulate("click");
      expect(consoleLog).toHaveBeenCalledWith("Initiating toggle");
      expect(consoleLog).toHaveBeenCalledWith("Play tone!");
      expect(mock.mock.calls.length).toBe(1);
      // First arg of first invocation was true
      expect(mock.mock.calls[0][0]).toBe(true);
    });
  });
});
