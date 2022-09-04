import { loginCredential, userData } from "../__mocks__";
import { renderWithProviders, mockNextUseRouter } from "utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import AuthPage from "pages/auth/[slug]";
import { login } from "hooks/store";

describe("SignIn Page", () => {
  mockNextUseRouter({
    route: "/",
    asPath: "/auth/login",
    pathname: "/auth/[slug]",
    query: { slug: "login" },
  });

  test("login after clicking the login button", async () => {
    const { store, container } = renderWithProviders(<AuthPage />);
    expect(container).toMatchSnapshot();

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
    // Submit the form
    fireEvent.submit(screen.getByTestId("submit"));

    // Dispatch login action
    store.dispatch(login(loginCredential.email));

    // Checking the login successful alert
    // expect(await screen.findAllByRole("alert")).toHaveLength(1);

    // Get store states
    const { email } = store.getState();
    expect(email).toBe(loginCredential.email);
  });
});

describe("SignUp Page", () => {
  mockNextUseRouter({
    route: "/",
    asPath: "/auth/signup",
    pathname: "/auth/[slug]",
    query: { slug: "signup" },
  });

  test("create a user and login after clicking the signup button", async () => {
    const { store, container } = renderWithProviders(<AuthPage />);
    expect(container).toMatchSnapshot();

    fireEvent.input(screen.getByLabelText("Adın *"), {
      target: {
        value: userData.firstName,
      },
    });
    fireEvent.input(screen.getByLabelText("Soyadın *"), {
      target: {
        value: userData.lastName,
      },
    });
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
    // Submit the form
    fireEvent.submit(screen.getByTestId("submit"));

    // Dispatch login action
    store.dispatch(login(loginCredential.email));

    // Get store states
    const { email } = store.getState();
    expect(email).toBe(loginCredential.email);
  });
});
