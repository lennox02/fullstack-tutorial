import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Button from "../button";

Enzyme.configure({ adapter: new Adapter() });

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
    console.log(wrapper.debug());
    expect(wrapper.find("button").length).toBe(1);
    expect(wrapper.find("button").text()).toEqual("Hello World");
  });
});
