import "@babel/polyfill";
import React from "react";
import { MaturityDateCalculator } from "Components/layout/MaturityDateCalculator";
import * as ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

describe("MaturityDateCalculator tests", () => {
  const mockFetch = jest.fn();
  let container;
  beforeAll(() => {
    global.fetch = mockFetch;
  });
  beforeEach(() => {
    // "testEnvironment":"jsdom"
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.resetAllMocks();
  });

  it("calls API", async () => {
    const promise = Promise.resolve({
      text: () => Promise.resolve("2021-11-25"),
      status: 200,
    });

    mockFetch.mockImplementation(() => promise);
    await act(async () => {
      ReactDOM.render(<MaturityDateCalculator />, container);
    });
    const maturityDateValue = document.querySelector(".maturity-date-value");
    expect(maturityDateValue.innerHTML).toBe("Maturity date: 2021-11-25");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  it("calls API after changing duration type", async () => {
    const promise = Promise.resolve({
      text: () => Promise.resolve("2021-11-25"),
      status: 200,
    });
    mockFetch.mockImplementation(() => promise);
    await act(async () => {
      ReactDOM.render(<MaturityDateCalculator />, container);
    });
    // get the drop down
    const tenorTypeSelect = document.getElementById("duration-select-type");
    expect(tenorTypeSelect).toBeDefined();
    // simulate selection
    await act(async () => {
      tenorTypeSelect.options[3].selected = true;
      Simulate.change(tenorTypeSelect);
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
  it("calls API after changing duration value", async () => {
    const promise = Promise.resolve({
      text: () => Promise.resolve("2021-11-25"),
      status: 200,
    });
    await act(async () => {
      mockFetch.mockImplementation(() => promise);
      ReactDOM.render(<MaturityDateCalculator />, container);
    });
    // get the drop down
    const tenorInputValue = document.getElementById("duration-input-value");
    expect(tenorInputValue).toBeDefined();
    // change
    await act(async () => {
      tenorInputValue.value = "6";
      Simulate.change(tenorInputValue);
      Simulate.keyDown(tenorInputValue, {
        key: "Enter",
        keyCode: 13,
        which: 13,
      });
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
