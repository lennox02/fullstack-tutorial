import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import BookTrips, { BOOK_TRIPS } from "../book-trips";
import { GET_LAUNCH } from "../cart-item";
import { wait } from "@testing-library/react";
import { cache, isLoggedInVar } from "../../cache";

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

describe("book trips", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <BookTrips cartItems={[]} />
      </MockedProvider>
    );
  });

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });
  it("renders without error", () => {
    //Assertions
    expect(
      wrapper.find('Styled(button)[data-testid="book-button"]').length
    ).toBe(1);
  });

  it("completes mutation and shows message", async () => {
    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ["1"] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: "success!", launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: "1" } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookTrips cartItems={["1"]} />
      </MockedProvider>
    );

    //click action button to add to cart
    wrapper.find('Styled(button)[data-testid="book-button"]').simulate("click");
    //wait for onClick function to finish
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(wrapper.find('[data-testid="message"]').length).toBe(1);
    });
  });

  it("correctly updates cache", async () => {
    expect(isLoggedInVar()).toBeFalsy();

    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ["1"] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: "success!", launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: "1" } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <BookTrips cartItems={["1"]} />
      </MockedProvider>
    );

    //click action button to add to cart
    wrapper.find('Styled(button)[data-testid="book-button"]').simulate("click");
    //wait for onClick function to finish

    // login is done if loader is gone
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(
        wrapper.find('Styled(button)[data-testid="book-button"]').length
      ).toBe(0);
    });
  });
});
