import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);

// const middlewares = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools:
    process.env.NODE_ENV === "development" ? composeWithDevTools() : false,
});

export default store;
