import React from "react";
import { Router } from "@reach/router";
import logo from "./logo.svg";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Router>
          <Home path="/" />
          <Detail path="detail/:id" />
        </Router>
      </main>
    </div>
  );
}

export default App;
