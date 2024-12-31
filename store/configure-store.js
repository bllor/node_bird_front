import { createWrapper } from "next-redux-wrapper";
import {
  applyMiddleware,
  compose,
  getDefaultMiddleware,
  legacy_createStore,
} from "@reduxjs/toolkit";
import RootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";
import { composeWithDevTools } from "redux-devtools-extension";

// function getServerState() {
//   return typeof document !== "undefined"
//     ? JSON.parse(document.querySelector("#__NEXT_DATA__").textContent)?.props
//         .pageProps.initialState
//     : undefined;
// }
// const serverState = getServerState();

// const loggerMiddleware =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     console.log("loggerMiddleware", action);
//     return next(action);
//   };

// const makeStore = () =>
//   configureStore({
//     reducer: RootReducer,
//     devTools: true,
//     middleware: [
//       loggerMiddleware,
//       // createSagaMiddleware
//     ], //
//     preloadedState: serverState, // SSR
//   });

// export default createWrapper(makeStore, {
//   debug: process.env.NODE_ENV !== "production",
// });

const configureStore = (context) => {
  console.log(context);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = legacy_createStore(RootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
