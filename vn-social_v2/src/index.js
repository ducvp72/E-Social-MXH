import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store";
import { ContextProvider } from "./Context";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        {/* <ContextProvider> */}
        <App />
        {/* </ContextProvider> */}
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
