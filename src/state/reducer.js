import { actions } from "./actions";

export const actionHandlers = {
  [actions.SET_PLAYERS]: (state, action) => ({
    ...state,
    players: action.payload,
  }),
  [actions.SET_CURRENT_PLAYER]: (state, action) => ({
    ...state,
    currentPlayer: action.payload,
  }),
  [actions.SET_CURRENT_PLAYER_PIC]: (state, action) => ({
    ...state,
    currentPlayerPic: action.payload,
  }),
  [actions.SET_CURRENT_PLAYER_STATS]: (state, action) => ({
    ...state,
    currentPlayerStats: action.payload,
  }),
  [actions.SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
};
