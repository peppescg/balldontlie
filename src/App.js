import React, { Suspense } from "react";
import { Router } from "@reach/router";
import "./App.css";

const LazyDetail = React.lazy(() => import("./routes/Detail"));
const LazyHome = React.lazy(() => import("./routes/Home"));

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <LazyHome path="/" />
            <LazyDetail path="detail/:id" />
            <NotFound default />
          </Router>
        </Suspense>
      </main>
    </div>
  );
}

export default App;

const NotFound = () => <div>Sorry, nothing here.</div>;
