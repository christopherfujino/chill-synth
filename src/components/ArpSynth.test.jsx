import { h } from "preact";
import { render } from "enzyme";
import ArpSynth from "./ArpSynth.jsx";

jest.mock("tone", () => {
  const Loop = jest.fn().mockImplementation(() => {
    return {"start": jest.fn()};
  });
  const Synth = jest.fn().mockImplementation(() => {
    return {"toMaster": jest.fn()};
  });
  // Works and lets you check for constructor calls:
  return {
    "Loop": Loop,
    "Synth": Synth,
  };
});

describe("<ArpSynth />", () => {
  it("constructs", () => {
    render(<ArpSynth />);
  });

  it("renders first time paused", () => {
    const synth = render(<ArpSynth />);
    expect(synth.text()).toMatch(RegExp("[Pp]ause"));
  });
});
