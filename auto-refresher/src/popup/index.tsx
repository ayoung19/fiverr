import * as React from "react";
import * as ReactDOM from "react-dom";
import { EuiProvider } from "@elastic/eui";
import { Popup } from "./Popup";

import "@elastic/eui/dist/eui_theme_light.css";
import "./index.css";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(
    <React.StrictMode>
      <EuiProvider colorMode="light">
        <Popup />
      </EuiProvider>
    </React.StrictMode>,
    document.getElementById("popup")
  );
});
