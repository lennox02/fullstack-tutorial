import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LaunchTile from "../launch-tile";

Enzyme.configure({ adapter: new Adapter() });

describe("Launch Tile", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <LaunchTile
        launch={{
          __typename: "Launch",
          isBooked: false,
          id: "1",
          mission: {
            name: "the first one",
            __typename: "Mission",
            missionPatch: null,
          },
          rocket: { name: "harambe", __typename: "Rocket", id: "1" },
        }}
      />
    );
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    expect(wrapper.find("LaunchTile").length).toBe(1);
    expect(wrapper.find("Link").length).toBe(1);
    expect(wrapper.find("Location").length).toBe(1);
    expect(wrapper.find("h3").text()).toEqual("the first one");
    expect(wrapper.find("h5").text()).toEqual("harambe");
  });
});
