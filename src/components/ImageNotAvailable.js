import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  notFound: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    background: "#e9e9e9",
    height: "9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ImageNotAvailable = () => {
  const classes = useStyles();
  return <div className={classes.notFound}>Not Available</div>;
};

export default ImageNotAvailable;
