import React, { useState, useContext, useEffect } from "react";

const GameContext = React.createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export const GameProvider = ({ children }) => {
  const [seasonGames, setSeasonGames] = useState([]);
  const [seasonResults, setSeasonResults] = useState([])

  useEffect(() => {
      getGames("2020")
      getResults()
  }, [])

  //Get all games in season
  async function getGames(season) {
    try {
      const response = await fetch(`https://hasses-sega-gubbar.herokuapp.com/games/${season}`, {});
      const data = await response.json();
      setSeasonGames(data)
    } catch {
      console.log("Error");
    }
  }

  //Get all results
  async function getResults() {
    try {
      const response = await fetch('https://hasses-sega-gubbar.herokuapp.com/games/results', {});
      const data = await response.json();
      setSeasonResults(data)
    } catch {
      console.log("Error");
    }
  }

  //Add new player result
  async function addResult(gameId, userId, data) {
    const response = await fetch(`https://hasses-sega-gubbar.herokuapp.com/games/${gameId}/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
     getGames("2020")
     getResults()
    } else if (response.status === 400) {
      console.log("error");
    }
  }

  //Edit player result
  async function editResult(id, data) {
    const response = await fetch(`https://hasses-sega-gubbar.herokuapp.com/games/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
     getGames("2020")
     getResults()
    } else if (response.status === 400) {
      console.log("error");
    }
  }

    async function deleteResult(id) {
    try {
      await fetch(`https://hasses-sega-gubbar.herokuapp.com/games/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getGames("2020")
      getResults()
    } catch {
      console.log("Error");
    }
  }
  
  return (
    <GameContext.Provider
      value={{ seasonGames, addResult, seasonResults, editResult, deleteResult }}
    >
      {children}
    </GameContext.Provider>
  );
};
