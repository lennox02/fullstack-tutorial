import React from "react";
import * as Enzyme from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import Footer from "../footer";

configure({ adapter: new Adapter() });

describe("Footer", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <Footer />
      </MockedProvider>
    );
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    console.log(wrapper.debug());
    expect(wrapper.find("Footer").length).toBe(1);
    expect(wrapper.find("Link").length).toBe(3);
    expect(wrapper.find("Location").length).toBe(3);
    expect(wrapper.find("svg").length).toBe(4);
    expect(wrapper.find("LogoutButton").length).toBe(1);
    expect(wrapper.find("button").first().text()).toEqual("Logout");
  });
});
