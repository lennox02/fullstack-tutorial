import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MenuItem from "../menu-item";

Enzyme.configure({ adapter: new Adapter() });

describe("Menu Item", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<MenuItem to="/wow" />);
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    expect(wrapper.find("Styled(Link)").length).toBe(1);
    expect(wrapper.find("Location").length).toBe(1);
    expect(wrapper.find("LocationProvider").length).toBe(1);
    expect(wrapper.find("a").length).toBe(1);
  });
});
