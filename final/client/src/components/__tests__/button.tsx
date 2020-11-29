import React from "react";
import * as Enzyme from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Button from "../button";

configure({ adapter: new Adapter() });

describe("Button", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<Button>Hello World</Button>);
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders without error", () => {
    expect(wrapper.find("button").length).toBe(1);
    expect(wrapper.find("button").text()).toEqual("Hello World");
  });
});
