import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import LogoutButton from "../logout-button";
import { cache, isLoggedInVar } from "../../cache";

Enzyme.configure({ adapter: new Adapter() });

describe("logout button", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders logout button", async () => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <LogoutButton />
      </MockedProvider>
    );
    //Assertions
    expect(wrapper.find("LogoutButton").length).toBe(1);
  });

  it("complete logout", async () => {
    isLoggedInVar(true);
    localStorage.setItem("token", "testTokenValue");
    localStorage.setItem("userId", "abc123");
    wrapper = Enzyme.mount(
      <MockedProvider cache={cache}>
        <LogoutButton />
      </MockedProvider>
    );
    wrapper.find('button[data-testid="logout-button"]').simulate("click");
    //wait for onClick function to finish
    wrapper.update();

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
  });
});
