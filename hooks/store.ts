import { useMemo } from "react";
import { createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let store: any;

const exampleInitialState = {
  email: null,
};

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// REDUCERS
export const reducer = (state = exampleInitialState, action: Action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        email: state.email,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        count: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        count: exampleInitialState.email,
      };
    default:
      return state;
  }
};

// ACTIONS
export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

export const login = (data: { email: string }) => {
  return { type: actionTypes.LOGIN, data };
};

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["exampleData"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

function makeStore(initialState = exampleInitialState) {
  return createStore(
    persistedReducer,
    initialState as any,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
