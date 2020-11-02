import React, { useEffect, useState } from 'react'
import './playerscores.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useGameContext } from '../../../context/gameContext'


export default function Playerscores() {
  const { seasonResults } = useGameContext() 
  const [scores, setScores] = useState([]) 
 
  function createData(player, games, goals, assists, points, penalties) {
    return {
      player,
      games,
      goals,
      assists,
      points,
      penalties,
    };
  }  

  useEffect(() => {
    for (const res of seasonResults) {
      res.games = 1;
      res.score = res.goals + res.assists;
    }

    var properties = ["goals", "assists", "penalties", "games", "score"];

    var map = seasonResults.reduce(function (map, e) {
      map[e.player.name] = properties.map(function (property, i) {
        return +e[property] + ((map[e.player.name] || [])[i] || 0);
      });
      return map;
    }, {});

    let result = Object.keys(map).map(function (k) {
      return map[k].reduce(
        function (object, e, i) {
          object[properties[i]] = e;
          return object;
        },
        { Player: k }
      );
    });

    let sortedList = result.sort((a, b) =>
      a.goals + a.assists < b.goals + b.assists ? 1 : -1
    );
    setScores(sortedList);
  }, [seasonResults]);

  const rows = 
    scores.map((player) => createData(player.Player, player.games, player.goals, player.assists, player.score, player.penalties))

  return (
    <div className={"playerscores"}>    
    <TableContainer component={Paper} style={{backgroundColor: "rgba(255,255,255,0.2)", boxShadow: '8px 8px 16px black', borderRadius: 15}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{color: "#66FCF1"}}>SPELARE</TableCell>
            <TableCell style={{color: "#66FCF1"}}>MATCHER</TableCell>
            <TableCell style={{color: "#66FCF1"}}>MÅL</TableCell>
            <TableCell style={{color: "#66FCF1"}}>ASSIST</TableCell>
            <TableCell style={{color: "#66FCF1"}}>POÄNG</TableCell>
            <TableCell style={{color: "#66FCF1"}}>UTV/MIN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.player}>
              <TableCell style={{color: "white"}} >{row.player.toUpperCase()}</TableCell>
              <TableCell style={{color: "white"}} >{row.games}</TableCell>
              <TableCell style={{color: "white"}} >{row.goals}</TableCell>
              <TableCell style={{color: "white"}} >{row.assists}</TableCell>
              <TableCell style={{fontWeight: "bold", color: "white"}}>{row.points}</TableCell>
              <TableCell style={{color: "white"}} >{row.penalties}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
