import { takeRandom } from "./utils";

describe("takeRandom()", () => {
  it("returns a single element from an input array", () => {
    const arr = ["a", "b", "c"];
    const output = takeRandom<string>(arr);
    expect(arr.indexOf(output)).not.toBe(-1);
  });
});
