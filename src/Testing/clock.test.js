import moment from "moment-timezone";
import { fireEvent, render, screen } from "@testing-library/react";
import Clock from "../Components/Clock/Clock";
import "@testing-library/jest-dom";

test("TimeZone Rendering.", () => {
  render(<Clock />);

  const timeZoneElement = screen.getByText(/Asia\/Kolkata/i);

  expect(timeZoneElement).toBeInTheDocument();
});

test("Time Rendering.", () => {
  render(<Clock />);

  const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2} (AM|PM)/i);

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