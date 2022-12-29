import React from "react";
import ReactDOM from "react-dom/client";

import Main from "./containers/Main";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import itemMovingReducer from "./store/dragdrop";

const store = configureStore({ reducer: itemMovingReducer });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
