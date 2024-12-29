import { createWrapper } from "next-redux-wrapper";
import {
  applyMiddleware,
  compose,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import RootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { en } from "@faker-js/faker";

function getServerState() {
  return typeof document !== "undefined"
    ? JSON.parse(document.querySelector("#__NEXT_DATA__").textContent)?.props
        .pageProps.initialState
    : undefined;
}
const serverState = getServerState();
console.log("serverState", serverState);
const makeStore = () =>
  configureStore({
    reducer: RootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState: serverState, // SSR
  });

export default createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
