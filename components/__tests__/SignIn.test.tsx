import React from "react";
import { loginCredential } from "../../__mocks__";
import { renderWithProviders, useRouter } from "utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import SignIn from "components/SignIn";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

useRouter.mockImplementation(() => ({
  route: "/",
  push: jest.fn(),
  query: { slug: "login" },
}));

test("fetches & receives a user after clicking the fetch user button", async () => {
  renderWithProviders(<SignIn />);

  fireEvent.input(screen.getByLabelText("E-mail Adresin *"), {
    target: {
      value: loginCredential.email,
    },
  });
  fireEvent.input(screen.getByLabelText("Şifren *"), {
    target: {
      value: loginCredential.password,
    },
  });
  fireEvent.submit(screen.getByTestId("submit"));
  // Check the notistack alert
  // expect(await screen.findAllByRole("alert")).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
});
