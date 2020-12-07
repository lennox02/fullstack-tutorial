import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import Footer from "../footer";

Enzyme.configure({ adapter: new Adapter() });

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
    var linkText = ["Home", "Cart", "Profile"];
    expect(wrapper.find("Footer").length).toBe(1);
    expect(wrapper.find("svg").length).toBe(4);
    expect(wrapper.find("LogoutButton").length).toBe(1);
    expect(
      wrapper.find("button[data-testid='logout-button']").text()
    ).toContain("Logout");
    expect(wrapper.find("Link").length).toBe(3);
    //find link text
    wrapper.find("Link a").forEach((node, index) => {
      expect(node.text()).toContain(linkText[index]);
    });
  });
});
