import App from "./App";
import { render } from "@testing-library/react";

test("The App renders all components correctly", () => {
  const { getByText, getByLabelText } = render(<App />);
  getByText("Don't click me"); // expect(getByText("Dont click me")).not.toBeNull();
  getByLabelText("What needs to be done?"); // expect(getByText("What needs to be done?")).not.toBeNull();
  getByText("TODO") // expect(getByText("TODO")).not.toBeNull();
  getByText("Add") // expect(getByText("Add")).not.toBeNull();

});
