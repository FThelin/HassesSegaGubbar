import React, { useState, useContext, useEffect } from "react";

const GameContext = React.createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export const GameProvider = ({ children }) => {
  const [seasonGames, setSeasonGames] = useState([]);

  useEffect(() => {
      getGames("2020")
  }, [])

  async function getGames(season) {
    try {
      const response = await fetch(`http://localhost:5000/games/${season}`, {});
      const data = await response.json();
      setSeasonGames(data)
    } catch {
      console.log("Error");
    }
  }

  
  return (
    <GameContext.Provider
      value={{ seasonGames }}
    >
      {children}
    </GameContext.Provider>
  );
};
