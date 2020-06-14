import React, { Suspense } from "react";
import { Router, Link } from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const LazyDetail = React.lazy(() => import("./routes/Detail"));
const LazyHome = React.lazy(() => import("./routes/Home"));

const useStyles = makeStyles((theme) => ({
  mainContent: {
    margin: "2rem 3rem",
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    height: "7vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > h1,a": {
      margin: "0 auto",
      padding: "0",
      color: theme.palette.common.white,
      textDecoration: "none",
    },
  },
  footer: {
    height: "4vh",
    backgroundColor: theme.palette.grey["900"],
    color: theme.palette.common.white,
    position: "fixed",
    bottom: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "1rem",
  },
  loader: theme.loader,
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={classes.mainContent}>
        <Suspense
          fallback={<CircularProgress size="4rem" className={classes.loader} />}
        >
          <Router>
            <LazyHome path="/" />
            <LazyDetail path="detail/:id" />
            <NotFound default />
          </Router>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;

const NotFound = () => <div>Sorry, nothing here.</div>;

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>BallDontLie</h1>
      </Link>
    </header>
  );
};

const Footer = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>Giuseppe Scuglia</footer>;
};
