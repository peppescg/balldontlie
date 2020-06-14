import React, { createContext, useReducer } from "react";
import { actionHandlers } from "./reducer";

const initialState = {
  players: [],
  loading: false,
  currentPlayer: null,
};

/**
 * Modify the state.
 * Through action type retrieve actionHandlers for update state
 * @returns {Object}
 */
const reducer = (state, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export const Context = createContext();

/**
 * Create context for share data through app tree.
 */
export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
