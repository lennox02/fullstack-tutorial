import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import { wait } from "../../test-utils";
import Profile, { GET_MY_TRIPS } from "../profile";

Enzyme.configure({ adapter: new Adapter() });

const mockLaunch = {
  __typename: "Launch",
  id: 1,
  isBooked: true,
  rocket: {
    __typename: "Rocket",
    id: 1,
    name: "tester",
  },
  mission: {
    __typename: "Mission",
    id: 1,
    name: "test mission",
    missionPatch: "/",
  },
};

const mockMe = {
  __typename: "User",
  id: 1,
  email: "a@a.a",
  trips: [mockLaunch],
};

describe("Profile Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  afterEach(() => {
    expect.hasAssertions();
    wrapper.unmount();
  });

  it("renders profile page", async () => {
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];

    wrapper = Enzyme.mount(
      <MockedProvider mocks={mocks}>
        <Profile />
      </MockedProvider>
    );
    // if the profile renders, it will have the list of missions booked
    await wait(() => {
      wrapper.update();
      //Assertions
      expect(wrapper.find("Profile h3").text()).toEqual("test mission");
    });
  });
});
