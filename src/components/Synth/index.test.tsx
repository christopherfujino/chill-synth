import { h } from "preact";
import { render, shallow } from "enzyme";
import Synth from "./index";

jest.mock("tone", () => {
  const Loop = jest.fn().mockImplementation(() => {
    return {"start": jest.fn()};
  });
  const PolySynth = jest.fn().mockImplementation(() => {
    return {
      "toDestination": jest.fn(() => {
        return {"get": jest.fn(() => ({
          "envelope": {
            "attack": 1,
            "decay": 1,
            "sustain": 1,
            "release": 1,
          },
          "oscillator": {"type": "sawtooth"},
        }))};
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
  let consoleLog: Function;
  beforeEach(() => {
    consoleLog = jest.fn();
    const cons = {"log": consoleLog} as Console;
    global.console = cons;
  });

  describe("static rendering", () => {
    it("succeeds", () => {
      render(
        <Synth
          audioContextStarted={false}
          updateAudioContext={(): void => undefined}
        />
      );
    });

    it("renders text reflecting audioContextStarted prop", () => {
      const synth = render(
        <Synth
          audioContextStarted={false}
          updateAudioContext={(): void => undefined}
        />);
      expect(synth.find("div.audio-context-indicator").text())
        .toBe("Tonejs: off");
    });
  });

  describe("shallow rendering", () => {
    it("succeeds with buttons", () => {
      const wrapper = shallow(
        <Synth
          audioContextStarted={false}
          updateAudioContext={(): void => undefined}
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
