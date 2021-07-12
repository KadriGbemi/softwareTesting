import ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/react";

import renderer from "react-test-renderer"

import Button from ".";

describe("Test my button component", () => {
  const render = (component) => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    return getQueriesForElement(div);
  };
  it("Renders button correctly and does not crash", () => {
    const { getByTestId } = render(<Button label="Dont click me" />);
    expect(getByTestId("my-button")).toHaveTextContent("Dont click me");
  });
  it("renders save text", () => {
    const { getByTestId } = render(<Button label="save"></Button>);
    expect(getByTestId("my-button")).toHaveTextContent("save");
  });

  it("Matches snapshot", ()=>{
      const buttonSnapshot = renderer.create(<Button label="Click me now"/>)
      expect(buttonSnapshot).toMatchSnapshot()
  })
});
