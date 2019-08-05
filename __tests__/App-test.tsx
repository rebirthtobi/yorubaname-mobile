/**
 * @format
 */
import { render } from "@testing-library/react-native";
import App from "../App";
import React from "react";

it("renders correctly", () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toMatchSnapshot();
});
