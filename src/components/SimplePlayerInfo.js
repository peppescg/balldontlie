import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme = { full_name: "" }) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    height: "3rem",
    width: "15rem",
    cursor: "pointer",
  },
}));

const SimplePlayerInfo = ({
  first_name,
  last_name,
  position,
  team,
  onClick,
  overrideClasses,
}) => {
  const classes = useStyles();

  return (
    <CardHeader
      data-testid={`${last_name}-${first_name}`}
      className={`${classes.header} ${overrideClasses}`}
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          {position}
        </Avatar>
      }
      title={`${first_name} ${last_name}`}
      subheader={team.full_name}
      onClick={onClick}
    />
  );
};

export default SimplePlayerInfo;
