import moment from "moment-timezone";
import { fireEvent, render, screen } from "@testing-library/react";
import Clock from "./Clock";
import "@testing-library/jest-dom";

test("Renders the Clock Page.", () => {
  render(<Clock />);
});

test("TimeZone Rendering.", () => {
  render(<Clock />);

  const timeZoneElement = screen.getByText(/Asia\/Kolkata/i);

  expect(timeZoneElement).toBeInTheDocument();
});

test("Time Rendering.", () => {
  render(<Clock />);

  const timeElement = screen.getByText(/(\d{1}|\d{2}):\d{2}:\d{2} (AM|PM)/i);

  expect(timeElement).toBeInTheDocument();
});

const timeZones = moment.tz.names();

test("TimeZone changes by Clicking Buttons.", () => {
  const { container } = render(<Clock />);

  timeZones.slice(0, 20).forEach((timeZone) => {
    const buttons = container.querySelectorAll("button");

    const buttonToClick = Array.from(buttons).find((button) => {
      return button.textContent === timeZone;
    });

    if (buttonToClick) {
      fireEvent.click(buttonToClick);
      const timeZoneElement = container.querySelector(".timeZone");
      expect(timeZoneElement).toHaveTextContent(timeZone);
    } else {
      throw new Error(`Button for ${timeZone} not found.`);
    }
  });
});

test("If Current Page is 1, then Previous Button is Disabled.", () => {
  const { getByTestId } = render(<Clock />);
  expect(getByTestId("prev-button")).toBeDisabled();
  expect(getByTestId("current-page")).toHaveTextContent("1");
});

test("If Current Page is 1, then Next Button is Not Disabled.", () => {
  const { getByTestId } = render(<Clock />);
  expect(getByTestId("next-button")).not.toBeDisabled();
  expect(getByTestId("current-page")).toHaveTextContent("1");
});

test("If the Next Button is Clicked, The Current Page is Increases.", () => {
  const { getByTestId } = render(<Clock />);
  fireEvent.click(getByTestId("next-button"));
  expect(getByTestId("current-page")).not.toHaveTextContent("1");
});

test("If the Next & Previous Button is Not Disabled. The Current Page is in Between.", () => {
  const { getByTestId } = render(<Clock />);
  expect(getByTestId("next-button", "prev-button")).not.toBeDisabled();
});

test("If Current Page is Not 1, Previous Button is Not Disabled.", () => {
  const { getByTestId } = render(<Clock />);
  fireEvent.click(getByTestId("next-button"));
  expect(getByTestId("prev-button")).not.toBeDisabled();
});

test("If Current Page is the Last Page, Next Button is Disabled.", () => {
  const { getByTestId } = render(<Clock />);

  const totalPages = Math.ceil(timeZones.length / 20);

  for (let i = 1; i < totalPages; i++) {
    fireEvent.click(getByTestId("next-button"));
  }

  expect(getByTestId("next-button")).toBeDisabled();
});

test("Pagination Display.", () => {
  const { getByTestId } = render(<Clock />);

  const totalPages = Math.ceil(timeZones.length / 20);
  expect(getByTestId("pagination-container")).toBeInTheDocument();
  expect(getByTestId("current-page")).toHaveTextContent("1");
  expect(getByTestId("next-button")).not.toBeDisabled();

  for (let i = 1; i < totalPages; i++) {
    fireEvent.click(getByTestId("next-button"));
  }
  expect(getByTestId("current-page")).toHaveTextContent(totalPages.toString());
  expect(getByTestId("next-button")).toBeDisabled();
});