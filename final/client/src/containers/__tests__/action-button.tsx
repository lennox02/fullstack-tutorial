import React from "react";
import * as Enzyme from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";
import ActionButton from "../action-button";

configure({ adapter: new Adapter() });

describe("action button", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  let wrapper: Enzyme.ReactWrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <ActionButton />
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
      wrapper.find('Styled(button)[data-testid="action-button"]').length
    ).toBe(1);
  });

  it("Add to Cart", () => {
    //Assertions
    expect(wrapper.find("ActionButton").text()).toEqual("Add to Cart");
  });
  it("Remove from Cart", () => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <ActionButton id="1" isBooked={false} />
      </MockedProvider>
    );
    //click action button to add to cart
    wrapper.find("button").simulate("click");
    wrapper.update();

    //Assertions
    expect(wrapper.find("ActionButton").text()).toEqual("Remove from Cart");
  });
  it("Cancel this Trip", () => {
    wrapper = Enzyme.mount(
      <MockedProvider>
        <ActionButton isBooked={true} />
      </MockedProvider>
    );
    //Assertions
    expect(wrapper.find("ActionButton").text()).toEqual("Cancel This Trip");
  });
});
