import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LaunchDetail from "../launch-detail";

Enzyme.configure({ adapter: new Adapter() });

describe("Launch Detail View", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <LaunchDetail
        id={"1"}
        site={"earth"}
        rocket={{
          name: "that one",
          type: "big",
          __typename: "Rocket",
          id: "1",
        }}
      />
    );
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders without error", () => {
    expect(wrapper.find("LaunchDetail").length).toBe(1);
    expect(wrapper.find("h3").text()).toEqual("that one (big)");
    expect(wrapper.find("h5").text()).toEqual("earth");
  });
});
