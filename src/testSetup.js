// This is a js file as config files don't need Types
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-preact-pure";

configure({ adapter: new Adapter() });
