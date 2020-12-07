import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<Header />);
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders without error", () => {
    expect(wrapper.find("Header").length).toBe(1);
    expect(wrapper.find("img").length).toBe(1);
    expect(wrapper.find("h2").text()).toEqual("Space Explorer");
  });
});
