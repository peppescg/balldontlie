import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import {
  createHistory,
  LocationProvider,
  createMemorySource,
} from "@reach/router";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ContextProvider, Context } from "./state";
import App from "./App";
import Detail from "./routes/Detail";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#467fcf" },
  },
  loader: {
    position: "fixed",
    left: "50%",
    top: "50%",
  },
});

const mockedState = {
  currentPlayer: {
    id: 237,
    first_name: "LeBron",
    height_feet: 6,
    height_inches: 8,
    last_name: "James",
    position: "F",
    team: {
      id: 14,
      abbreviation: "LAL",
      city: "Los Angeles",
      conference: "West",
      division: "Pacific",
      full_name: "Los Angeles Lakers",
      name: "Lakers",
    },
    weight_pounds: 250,
  },
  currentPlayerStats: {
    data: [
      {
        games_played: 60,
        player_id: 237,
        season: 2019,
        min: "34:54",
        fgm: 9.77,
        fga: 19.6,
        fg3m: 2.22,
        fg3a: 6.35,
        ftm: 3.98,
        fta: 5.72,
        oreb: 0.95,
        dreb: 6.9,
        reb: 7.85,
        ast: 10.6,
        stl: 1.23,
        blk: 0.5,
        turnover: 3.98,
        pf: 1.77,
        pts: 25.73,
        fg_pct: 0.498,
        fg3_pct: 0.349,
        ft_pct: 0.697,
      },
    ],
  },
};

it("Search player - success", async () => {
  mockFetch([
    {
      id: 237,
      first_name: "LeBron",
      height_feet: 6,
      height_inches: 8,
      last_name: "James",
      position: "F",
      team: {
        id: 14,
        abbreviation: "LAL",
        city: "Los Angeles",
        conference: "West",
        division: "Pacific",
        full_name: "Los Angeles Lakers",
        name: "Lakers",
      },
      weight_pounds: 250,
    },
  ]);

  const {
    getByTestId,
    history: { navigate },
  } = renderWithRouter(<App />);

  await navigate("/");

  const contentInput = getByTestId("content-input");

  act(() => {
    fireEvent.change(contentInput, {
      target: { value: "lebron" },
    });
  });

  await waitFor(() => {
    expect(getByTestId("James-LeBron")).toBeInTheDocument();
  });
});

it("Render detail page with mock data", async () => {
  const tree = (
    <LocationProvider history={createHistory(createMemorySource("/"))}>
      <Context.Provider value={[mockedState, jest.fn()]}>
        <Detail id="237" />
      </Context.Provider>
    </LocationProvider>
  );
  const { getByTestId } = render(tree);
  await waitFor(() => {
    expect(getByTestId("James-LeBron")).toBeInTheDocument();
  });
});

function mockFetch(data) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: data,
        }),
    })
  );
}

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <LocationProvider history={history}>
          <ContextProvider>{ui}</ContextProvider>
        </LocationProvider>
      </ThemeProvider>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
