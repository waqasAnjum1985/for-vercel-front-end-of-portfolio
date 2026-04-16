import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./rudux/store.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
