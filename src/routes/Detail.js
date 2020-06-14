import React, { useEffect, useState } from "react";
import Player from "../components/Player";
import { getPlayer } from "../data";

const Detail = ({ id }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = async () => {
      const data = await getPlayer(id);
      setPlayer(data);
    };
    player();
  }, [id]);
  return (
    <div>
      <h2>Detail</h2>
      {player && <Player {...player} />}
    </div>
  );
};

export default Detail;
