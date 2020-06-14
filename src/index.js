import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { createHistory, LocationProvider } from "@reach/router";
import "./index.css";
import { ContextProvider } from "./state";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#467fcf" },
  },
  loader: {
    position: "fixed",
    left: "50%",
    top: "50%",
  },
});

let history = createHistory(window);

ReactDOM.render(
  <React.StrictMode>
    <LocationProvider history={history}>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ThemeProvider>
    </LocationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
