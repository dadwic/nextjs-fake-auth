import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { AppStore, RootState, persistedReducer } from "hooks/store";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from ".";

export const useRouter: any = jest.spyOn(require("next/router"), "useRouter");

useRouter.mockImplementation(() => ({
  route: "/",
  push: jest.fn(),
  query: { slug: "login" },
}));

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: persistedReducer,
      preloadedState,
    }),
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
