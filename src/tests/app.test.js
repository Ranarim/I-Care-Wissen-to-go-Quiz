import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../components/App";
import store from "../store";

describe("App", () => {
  test("should render the loginform onload", () => {
    render(
        <Provider store={store}>
          <App />
        </Provider>
    );
    const loginText = screen.getByText(/employee polls/i)
    expect(loginText).toBeInTheDocument();
})
})

