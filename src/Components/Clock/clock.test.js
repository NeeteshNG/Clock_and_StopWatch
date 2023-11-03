import moment from "moment-timezone";
import { fireEvent, render, screen } from "@testing-library/react";
import Clock from "./Clock";
import "@testing-library/jest-dom";

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

const timeZones = moment.tz.names().slice(0, 20);

test("TimeZone changes by Clicking Buttons", () => {
  const { container } = render(<Clock />);

  timeZones.forEach((timeZone) => {
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
  expect(getByTestId('current-page')).toHaveTextContent('1')
});

test("If Current Page is 1, then Next Button is Not Disabled.", () => {
    const { getByTestId } = render(<Clock />);
    expect(getByTestId("next-button")).not.toBeDisabled();
    expect(getByTestId('current-page')).toHaveTextContent('1')
});

test("If the Next Button is Clicked, The Current Page is Increases.", () => {
    const { getByTestId } = render(<Clock />);
    fireEvent.click(getByTestId("next-button"));
    expect(getByTestId('current-page')).not.toHaveTextContent('1')
});

test("If the Next & Previous Button is Not Disabled. The Current Page is in Between.", () => {
    const { getByTestId } = render(<Clock />);
    expect(getByTestId("next-button", "prev-button")).not.toBeDisabled();
});