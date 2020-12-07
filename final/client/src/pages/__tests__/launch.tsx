import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import Launch, { GET_LAUNCH_DETAILS } from "../launch";
import { wait } from "../../test-utils";

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

describe("Launch Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders launch", async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks}>
        <Launch launchId={1} />
      </MockedProvider>
    );
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(wrapper.find("Launch h2").text()).toEqual("test mission");
    });
  });
});
