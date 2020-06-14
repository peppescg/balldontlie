import React, { useEffect, useContext } from "react";
import Player from "../components/Player";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { getPlayer, getPlayerPic, getPlayerStats } from "../data";
import { actions } from "../state/actions";
import { Context } from "../state";

const useStyles = makeStyles((theme) => ({
  loader: theme.loader,
}));

const Detail = ({ id }) => {
  const classes = useStyles();
  const [{ currentPlayer, loading }, dispatch] = useContext(Context);

  useEffect(() => {
    if (currentPlayer && currentPlayer.id === Number(id)) {
      dispatch({
        type: actions.SET_LOADING,
        payload: false,
      });
    } else {
      const player = async () => {
        const player = await getPlayer(id);
        const img = await getPlayerPic(player.last_name, player.first_name);
        const { data } = await getPlayerStats(id);
        dispatch({ type: actions.SET_CURRENT_PLAYER, payload: player });
        dispatch({ type: actions.SET_CURRENT_PLAYER_PIC, payload: img });
        if (data.length) {
          dispatch({
            type: actions.SET_CURRENT_PLAYER_STATS,
            payload: data[0],
          });
        }
        dispatch({
          type: actions.SET_LOADING,
          payload: false,
        });
      };
      player();
    }
  }, [id, dispatch, currentPlayer]);
  return (
    <div>
      {loading ? (
        <CircularProgress size="4rem" className={classes.loader} />
      ) : (
        <>{currentPlayer && <Player {...currentPlayer} />}</>
      )}
    </div>
  );
};

export default Detail;
