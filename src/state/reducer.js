import { actions } from "./actions";

export const actionHandlers = {
  [actions.SET_PLAYERS]: (state, action) => ({
    ...state,
    error: null,
    players: action.payload,
  }),
  [actions.SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
};
