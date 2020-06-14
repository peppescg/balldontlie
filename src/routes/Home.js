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
  },
  card: {
    width: "16rem",
    height: "15rem",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 40rem",
  },
  players: {
    margin: "2rem 0",
    display: "flex",
    justifyContent: "start",
    "&:last-child": {
      jsutifyContent: "start",
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
          <Grid className={classes.players} container spacing={2}>
            {players.map((player) => (
              <Grid key={player.id} item>
                <Card className={classes.root}>
                  <SimplePlayerInfo
                    key={player.id}
                    {...player}
                    onClick={() => navigate(`detail/${player.id}`)}
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
