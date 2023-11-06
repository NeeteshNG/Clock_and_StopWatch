import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stopwatch from "./Stopwatch";

test("Renders the Clock Page.", () => {
  render(<Stopwatch />);
});

test("Stopwatch Rendering.", () => {
  render(<Stopwatch />);

  const timeElement = screen.getByText(/(\d{1}|\d{2}):\d{2}:\d{2}/i);

  expect(timeElement).toBeInTheDocument();
});

test("If not Start, Stop button is Disabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  expect(getByTestId("stop")).toBeDisabled();
});

test("If not Start, Lapse button is Disabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  expect(getByTestId("lap")).toBeDisabled();
});

test("If not Start, Start button is Enabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  expect(getByTestId("start")).not.toBeDisabled();
});

test("If not Start, Reset button is Enabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  expect(getByTestId("reset")).not.toBeDisabled();
});

test("If Start, Lapse, Stop, Reset button is Enabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  fireEvent.click(getByTestId("start"));
  expect(getByTestId("lap")).not.toBeDisabled();
  expect(getByTestId("stop")).not.toBeDisabled();
  expect(getByTestId("reset")).not.toBeDisabled();
});

test("If Stop, Start and Reset button is Enabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  fireEvent.click(getByTestId("stop"));
  expect(getByTestId("start")).not.toBeDisabled();
  expect(getByTestId("reset")).not.toBeDisabled();
});

test("If Reset, Stop and Lapse button is Disabled.", () => {
  const { getByTestId } = render(<Stopwatch />);
  fireEvent.click(getByTestId("reset"));
  expect(getByTestId("start")).not.toBeDisabled();
  expect(getByTestId("lap")).toBeDisabled();
  expect(getByTestId("stop")).toBeDisabled();
});

test("Lap Time Display", () => {
  const { getByTestId } = render(<Stopwatch />);
  fireEvent.click(getByTestId("start"));
  fireEvent.click(getByTestId("lap"));

  const lapList = getByTestId("lap-list");
  expect(lapList).toHaveTextContent(/Lap 1 : \d{1}:\d{2}:\d{2}.\d{3}/i);
});

test("Invalid Input (Not Number)", () => {
  const { getByTestId } = render(<Stopwatch />);
  const inputField = getByTestId("input-min");

  fireEvent.change(inputField, { target: { value: "abc" } });

  expect(inputField).toHaveValue(null);
});

test("Edge Case : Rapid Button Clicks", () => {
  const { getByTestId } = render(<Stopwatch />);
  const startButton = getByTestId("start");
  const lapButton = getByTestId("lap");

  fireEvent.click(startButton);
  fireEvent.click(lapButton);
  fireEvent.click(getByTestId("stop"));
  fireEvent.click(startButton);
  fireEvent.click(lapButton);
  fireEvent.click(getByTestId("stop"));
})