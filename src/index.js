import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FeedbackContextProvider } from "./contexts/feedback-context";

ReactDOM.render(
  <FeedbackContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FeedbackContextProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
