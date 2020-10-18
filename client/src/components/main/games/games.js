import React, { useEffect, useState } from 'react'
import './games.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useGameContext } from '../../../context/gameContext'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, team, result, motm) {
  return {  date, team, result, motm };
}

export default function Games() {
  const classes = useStyles();

  const { seasonGames } = useGameContext()
  const [rows, setRows] = useState([])
  
  useEffect(() => {  
      let temp = []    
      for(const game of seasonGames) {
          let x = createData(game.date, game.team, game.result, game.motm)
          temp.push(x)
      }
      setRows(temp)
  }, [seasonGames])

  return (
    <div className={"games"}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">DATUM</TableCell>
            <TableCell align="right">MATCH</TableCell>
            <TableCell align="right">RESULTAT</TableCell>
            <TableCell align="right">MOTM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.team}</TableCell>
              <TableCell align="right">{row.result}</TableCell>
              <TableCell align="right">{row.motm}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}