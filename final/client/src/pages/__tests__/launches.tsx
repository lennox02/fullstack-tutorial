import React from "react";
import { InMemoryCache } from "@apollo/client";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import { wait } from "../../test-utils";
import Launches, { GET_LAUNCHES } from "../launches";

Enzyme.configure({ adapter: new Adapter() });

const mockLaunch = {
  __typename: "Launch",
  id: 1,
  isBooked: true,
  rocket: {
    __typename: "Rocket",
    id: 1,
    name: "tester",
    type: "test",
  },
  mission: {
    __typename: "Mission",
    id: 1,
    name: "test mission",
    missionPatch: "/",
  },
  site: "earth",
  isInCart: false,
};

describe("Launches Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders launches", async () => {
    const cache = new InMemoryCache({ addTypename: false });
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: "123",
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];
    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks}>
        <Launches />
      </MockedProvider>
    );
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(wrapper.find("Launches h3").text()).toEqual("test mission");
    });
  });
});
