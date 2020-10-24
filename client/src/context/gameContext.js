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

  async function addResult(gameId, userId, data) {
    const response = await fetch(`http://localhost:5000/games/${gameId}/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      //const responseData = await response.json();
     getGames("2020")
    } else if (response.status === 400) {
      console.log("error");
    }
  }
  
  return (
    <GameContext.Provider
      value={{ seasonGames, addResult }}
    >
      {children}
    </GameContext.Provider>
  );
};
