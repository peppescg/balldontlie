import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import SimplePlayerInfo from "../components/SimplePlayerInfo";
import { getPlayers } from "../data";
import { actions } from "../state/actions";
import { Context } from "../state";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    width: "16rem",
    height: "15rem",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2vh 30vw",
  },
  players: {
    "&:after": {
      content: "",
      flex: "auto",
    },
  },
  [theme.breakpoints.down("md")]: {
    searchBox: {
      margin: "2vh 10vw",
    },
  },
}));

const Home = () => {
  const [{ players }, dispatch] = useContext(Context);
  const navigate = useNavigate();

  async function fetchData(params) {
    const data = await getPlayers(params);
    dispatch({ type: actions.SET_PLAYERS, payload: data });
  }

  const goTo = (id) => {
    dispatch({
      type: actions.SET_LOADING,
      payload: true,
    });
    dispatch({ type: actions.SET_PLAYERS, payload: [] });
    navigate(`detail/${id}`);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form className={classes.searchBox} noValidate autoComplete="off">
        <TextField
          size="medium"
          fullWidth
          label="Search a player..."
          onChange={(e) => fetchData(e.target.value)}
        />
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            className={classes.players}
            justify="center"
            container
            spacing={2}
          >
            {players.map((player) => (
              <Grid key={player.id} item>
                <Card className={classes.root}>
                  <SimplePlayerInfo
                    key={player.id}
                    {...player}
                    onClick={() => goTo(player.id)}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
