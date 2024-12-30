import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import { default as logger } from "redux-logger";

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (import.meta.env.MODE !== "production") {
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
