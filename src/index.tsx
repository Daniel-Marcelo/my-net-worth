import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Preflight } from "@xstyled/styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./firebase";

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <Preflight />
    <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
