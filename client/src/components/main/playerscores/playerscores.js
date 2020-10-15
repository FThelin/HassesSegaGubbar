import React from 'react'
import './playerscores.css'
import PropTypes from 'prop-types';
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
      color: theme.palette.grey[300]
    },
  },
});

function createData(id, player, games, goals, assists, points, penalties, history) {
  return {
    id,
    player,
    games,
    goals,
    assists,
    points,
    penalties,
    history
  };
}

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
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.games}</TableCell>
        <TableCell align="right">{row.goals}</TableCell>
        <TableCell align="right">{row.assists}</TableCell>
        <TableCell align="right">{row.points}</TableCell>
        <TableCell align="right">{row.penalties}</TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Historik
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: 'white'}}>Datum</TableCell>
                    <TableCell style={{color: 'white'}}>Match</TableCell>
                    <TableCell style={{color: 'white'}} align="right">Mål</TableCell>
                    <TableCell style={{color: 'white'}} align="right">Assist</TableCell>
                    <TableCell style={{color: 'white'}} align="right">Utv/min</TableCell>                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell style={{color: 'white'}} component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell style={{color: 'white'}}>{historyRow.game}</TableCell>
                      <TableCell style={{color: 'white'}} align="right">{historyRow.goals}</TableCell>
                      <TableCell style={{color: 'white'}} align="right">{historyRow.assists}</TableCell>
                      <TableCell style={{color: 'white'}} align="right">{historyRow.penalties}</TableCell>                      
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Fredrik Thelin', 2, 2, 4, 1, 5, 4, [ {
      date: "2020-10-13",   
      game: "HSG",
      goals: 2,
      assists: 3,
      penalties: 2
  }])  
];

export default function Playerscores() {
  return (
    <div className={"playerscores"}>
        <TableContainer component={Paper} style={{backgroundColor: "rgba(255,255,255,0.2)", boxShadow: '8px 8px 16px black', borderRadius: 15}}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell style={{color: "#66FCF1"}}>SPELARE</TableCell>
                <TableCell style={{color: "#66FCF1"}} align="right">MATCHER</TableCell>
                <TableCell style={{color: "#66FCF1"}} align="right">MÅL</TableCell>
                <TableCell style={{color: "#66FCF1"}} align="right">ASSIST</TableCell>
                <TableCell style={{color: "#66FCF1"}} align="right">POÄNG</TableCell>
                <TableCell style={{color: "#66FCF1"}} align="right">UTV/MIN</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}