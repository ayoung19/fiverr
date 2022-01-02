import * as React from "react";
import * as ReactDOM from "react-dom";
import { Popup } from "./Popup";
import "./index.css";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    document.getElementById("popup")
  );
});
