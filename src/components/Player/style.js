import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70vw",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  media: {
    paddingTop: "56.25%", // 16:9
    height: "10vh",
  },
  card: {
    width: "auto",
    "& span": {
      ...theme.typography.h6,
    },
  },
  value: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  [theme.breakpoints.down("md")]: {
    card: {
      width: "auto",
      "& span": {
        fontSize: theme.typography.fontSize,
      },
    },
  },
  loader: theme.loader,
}));
