import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Offscreen } from "./Offscreen";
import { Popup } from "./Popup";

ReactDOM.render(
  <React.StrictMode>
    {process.env.REACT_APP_BUILD_TARGET === "offscreen" ? (
      <Offscreen />
    ) : (
      <Popup />
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
