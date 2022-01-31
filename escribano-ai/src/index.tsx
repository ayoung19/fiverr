import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@elastic/eui/dist/eui_theme_light.min.css";

import { EuiProvider } from "@elastic/eui";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <EuiProvider colorMode="light">
      <App />
    </EuiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
