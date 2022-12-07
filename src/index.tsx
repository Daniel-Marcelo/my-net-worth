import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { initializeApp } from "firebase/app";
import { defaultTheme, ThemeProvider, Preflight } from "@xstyled/styled-components";
import { getFirestore } from "firebase/firestore";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = {
  ...defaultTheme,
};

const app = initializeApp({
  apiKey: "AIzaSyA3yFNfYzc43jEg0coAdW8aFN3wqBbCstA",
  authDomain: "my-net-worth-74297.firebaseapp.com",
  projectId: "my-net-worth-74297",
  storageBucket: "my-net-worth-74297.appspot.com",
  messagingSenderId: "645211709733",
  appId: "1:645211709733:web:cba05ed048f6d9f267bacc",
  measurementId: "G-ZW7S39KRD7",
});

export const db = getFirestore(app);

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
