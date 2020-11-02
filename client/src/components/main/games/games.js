import React, { useEffect, useState } from 'react'
import './games.css'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { theme } from '../../../theme';
import { useGameContext } from '../../../context/gameContext'
import { useUserContext } from '../../../context/userContext'
import PlayerResult from '../playerResult/playerResult'


export default function Games() {

  function createData(id, date, team, result, motm, player) {
    return {  id, date, team, result, motm, player };
  }
  
  const { seasonGames, seasonResults } = useGameContext()
  const { loggedInUser } = useUserContext()
  const [rows, setRows] = useState([])
  
  useEffect(() => {     
      let temp = []    
      for(const result of seasonGames) {
          let playerresults = seasonResults.filter((pr) => pr.game._id === result._id)
          
          let x = createData(result._id, result.date, result.team, result.result, result.motm, playerresults)
          temp.push(x)
       }
      setRows(temp)
  }, [seasonGames, seasonResults])


  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
        color: theme.palette.grey[300]
      },
    },
  });
  
 
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" style={{color: "#66FCF1"}}size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.team}</TableCell>
          <TableCell>{row.result}</TableCell>
          <TableCell>{row.motm}</TableCell>
          {loggedInUser ? (
            <TableCell>
              <PlayerResult team={row.team} userId={loggedInUser._id} gameId={row.id} playerResult={row.player} playerName={loggedInUser.name}/>
          </TableCell>
          ) : null}
        </TableRow>
        <TableRow className={classes.root}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Spelarresultat
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{color: 'white'}}>Spelare</TableCell>
                      <TableCell style={{color: 'white'}}>Mål</TableCell>
                      <TableCell style={{color: 'white'}}>Assist</TableCell>
                      <TableCell style={{color: 'white'}}>Utv/min</TableCell>                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.player.map((historyRow) => (
                      <TableRow key={historyRow._id}>
                        <TableCell style={{color: 'white'}}>{historyRow.player.name}</TableCell>
                        <TableCell style={{color: 'white'}}>{historyRow.goals}</TableCell>
                        <TableCell style={{color: 'white'}}>{historyRow.assists}</TableCell>
                        <TableCell style={{color: 'white'}}>{historyRow.penalties}</TableCell>                      
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  
      return (
      <div className={"playerscores"}>
          <TableContainer component={Paper} style={{backgroundColor: "rgba(255,255,255,0.2)", boxShadow: '8px 8px 16px black', borderRadius: 15}}>
          <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell style={{color: "#66FCF1"}}>DATUM</TableCell>
                  <TableCell style={{color: "#66FCF1"}}>MATCH</TableCell>
                  <TableCell style={{color: "#66FCF1"}}>RESULTAT</TableCell>
                  <TableCell style={{color: "#66FCF1"}}>MOTM</TableCell>
                  {loggedInUser ? (
                    <TableCell style={{color: "#66FCF1"}}>DITT RESULTAT</TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                  <Row key={row.id} row={row} />
              ))}
              </TableBody>
          </Table>
          </TableContainer>
      </div>
    );
}




  
