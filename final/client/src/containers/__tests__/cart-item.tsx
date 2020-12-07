import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import CartItem, { GET_LAUNCH } from "../cart-item";
import { wait } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

const mockLaunch = {
  __typename: "Launch",
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: "tester",
  },
  mission: {
    name: "test mission",
    missionPatch: "/",
  },
};

describe("cart item", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("queries item and renders without error", async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: "1" } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks} addTypename={true}>
        <CartItem launchId={"1"} />
      </MockedProvider>
    );

    // check the loading state
    expect(wrapper.find("CartItem").text()).toEqual("Loading...");

    //wait for onClick function to finish
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(wrapper.find("CartItem h3").text()).toEqual("test mission");
    });
  });

  it("renders with error state", async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: "1" } },
        error: new Error("aw shucks"),
      },
    ];

    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartItem launchId={"1"} />
      </MockedProvider>
    );

    //wait for onClick function to finish
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(wrapper.find("CartItem").text()).toEqual("ERROR: aw shucks");
    });
  });
});
