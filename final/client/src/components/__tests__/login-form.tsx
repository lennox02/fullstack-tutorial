import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginForm from "../login-form";

Enzyme.configure({ adapter: new Adapter() });

describe("Login Form", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<LoginForm login={() => {}} />);
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    expect(wrapper.find("LoginForm").length).toBe(1);
    expect(wrapper.find("header").length).toBe(1);
    expect(wrapper.find("svg").length).toBe(3);
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("button").length).toBe(1);
    expect(wrapper.find("h1").text()).toEqual("Space Explorer");
    expect(wrapper.find("button").text()).toEqual("Log in");
  });
});
