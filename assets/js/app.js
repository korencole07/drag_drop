import React from "react";
import ReactDOM from "react-dom/client";

import Layout from "./containers/Layout";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import itemMovingReducer from "./store/dragdrop";

const store = configureStore({
  reducer: itemMovingReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <MantineProvider>
      <NotificationsProvider>
        <Layout />
      </NotificationsProvider>
    </MantineProvider>
  </Provider>
);
