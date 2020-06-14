export const getPlayers = async (searchParams) => {
  try {
    const base = process.env.REACT_APP_BASE_API_URL;
    const url = searchParams
      ? `${base}/players?search=${searchParams}`
      : `${base}/players`;
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://www.balldontlie.io",
      },
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPlayerPic = async (lastName, firstName) => {
  try {
    const base = process.env.REACT_APP_BASE_API_PIC_URL;
    // console.log(`${base}/${lastName}/${firstName}`);
    // console.log("https://nba-players.herokuapp.com/players/lofton/zach");
    const response = await fetch(`${base}/${lastName}/${firstName}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://nba-players.herokuapp.com",
      },
    });
    const data = await response.blob();
    if (data.type === "image/png") {
      return URL.createObjectURL(data);
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getPlayer = async (id) => {
  try {
    const base = process.env.REACT_APP_BASE_API_URL;
    const response = await fetch(`${base}/players/${id}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://www.balldontlie.io",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getPlayerStats = async (id) => {
  try {
    const base = process.env.REACT_APP_BASE_API_URL;
    const response = await fetch(`${base}/season_averages?player_ids[]=${id}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://www.balldontlie.io",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
