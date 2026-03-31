import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders site navigation and main title", () => {
  render(<App />);

  expect(screen.getByText("Столичная одежда")).toBeTruthy();
  expect(
    screen.getByRole("heading", {
      name: /Одежда столичных низших слоёв от XVIII века до 1910-х/i,
    })
  ).toBeTruthy();
});
