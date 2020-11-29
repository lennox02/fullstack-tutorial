import React from "react";
import * as Enzyme from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Loading from "../loading";

configure({ adapter: new Adapter() });

describe("Loading", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<Loading />);
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    expect(wrapper.find("Styled(Component)").length).toBe(1);
    expect(wrapper.find("svg").length).toBe(1);
  });
});
