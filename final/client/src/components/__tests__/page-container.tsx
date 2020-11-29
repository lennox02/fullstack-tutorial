import React from "react";
import * as Enzyme from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PageContainer from "../page-container";

configure({ adapter: new Adapter() });

describe("Page Container", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<PageContainer />);
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    expect(wrapper.find("PageContainer").length).toBe(1);
    expect(wrapper.find("Styled(div)").length).toBe(2);
  });
});
