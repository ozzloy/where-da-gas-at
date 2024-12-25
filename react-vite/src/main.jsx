import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import { thunkAuthenticate } from "./redux/session";

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

// "email": "demo@example.com",
// "password": "password",
store.dispatch(thunkAuthenticate());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
