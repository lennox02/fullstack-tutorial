import React from "react";
import * as Enzyme from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import { wait } from "../../test-utils";
import Cart from "../cart";
import { GET_LAUNCH } from "../../containers/cart-item";
import { cache, cartItemsVar } from "../../cache";

configure({ adapter: new Adapter() });

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

describe("Cart Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders with message for empty carts", async () => {
    wrapper = Enzyme.mount(
      <MockedProvider cache={cache}>
        <Cart />
      </MockedProvider>
    );
    expect(wrapper.find('Cart p[data-testid="empty-message"]').length).toBe(1);
  });

  it("renders cart", async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: "1" } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    wrapper = Enzyme.mount(
      <MockedProvider cache={cache} mocks={mocks}>
        <Cart />
      </MockedProvider>
    );
    cartItemsVar(["1"]);
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(
        wrapper.find('BookTrips button[data-testid="book-button"]').length
      ).toBe(1);
    });
  });
});
