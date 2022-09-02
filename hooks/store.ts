import type { State } from "interfaces";
import { useMemo } from "react";
import { createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let store: any;

export const exampleInitialState: State = {
  email: null,
  loading: false,
};

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
};

// REDUCERS
export const reducer = (
  state = exampleInitialState,
  { type, ...action }: Action
) => {
  switch (type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        ...action,
        loading: true,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        ...action,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loading: true,
        email: exampleInitialState.email,
      };
    default:
      return state;
  }
};

// ACTIONS
export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

export const setLoading = (loading: boolean) => {
  return { type: actionTypes.LOADING, loading };
};

export const login = (email: string) => {
  return { type: actionTypes.LOGIN, email };
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["email"], // place to select which state you want to persist
};

export const persistedReducer = persistReducer(persistConfig, reducer);

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

export type RootState = ReturnType<typeof persistReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
