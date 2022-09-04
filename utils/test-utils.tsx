import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import type { PreloadedState } from "@reduxjs/toolkit";
import { AppStore, RootState, persistedReducer } from "hooks/store";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from ".";

export const wait = (ms: number) =>
  new Promise<string>((res) => setTimeout(res, ms));
export const useRouter: any = jest.spyOn(require("next/router"), "useRouter");

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: {
  route: string;
  query: object;
  asPath?: string;
  pathname?: string;
}) {
  useRouter.mockImplementation(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));
}

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = createStore(persistedReducer),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    const router = useRouter();
    return (
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider preventDuplicate maxSnack={1}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </RouterContext.Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
