import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import { wait } from "../../test-utils";
import Login, { LOGIN_USER } from "../login";
import { cache, isLoggedInVar } from "../../cache";

Enzyme.configure({ adapter: new Adapter() });

describe("Login Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders login page", async () => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );
    expect(wrapper.find("Login").length).toBe(1);
  });

  it("fires login mutation and updates cache after done", async () => {
    expect(isLoggedInVar()).toBeFalsy();

    const mocks = [
      {
        request: { query: LOGIN_USER, variables: { email: "a@a.a" } },
        result: {
          data: {
            login: {
              id: "abc123",
              token: "def456",
            },
          },
        },
      },
    ];

    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <Login />
      </MockedProvider>
    );

    wrapper
      .find('input[data-testid="login-input"]')
      .simulate("change", { target: { value: "a@a.a" } });

    wrapper.update();

    wrapper.find("Login button").simulate("submit");

    wrapper.update();

    // login is done if loader is gone
    await wait(() => {
      //Assertions
      expect(isLoggedInVar()).toBeTruthy();
    });
  });
});
