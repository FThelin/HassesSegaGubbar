import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useGameContext } from '../../../context/gameContext'

const PlayerResult = (props) => {
  const { addResult } = useGameContext()
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({
      goals: 0,
      assists: 0,
      penalties: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOrEdit = () => {    
      
    let foundUser = []  
    
    foundUser = props.playerResult.filter((result) => result.player === props.playerName)
    
    if (foundUser.length > 0) {
      return (
        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
          Redigera
        </Button>
          )
        } else if (foundUser.length <= 0){
          return (
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Lägg till
            </Button>
          )
        }
  }

  return (
    <div>      
      {addOrEdit()}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.team}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lägg till ditt resultat för den här matchen.
          </DialogContentText>
          <div style={{padding: "1rem", display: "flex", flexDirection: "column"}}>
          <FormControl style={{marginTop: "0.5rem"}}>
        <InputLabel id="select-label">Mål</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={result.goals}
          onChange={(e) => setResult({...result, goals: e.target.value})}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        </FormControl>
        <FormControl style={{marginTop: "0.5rem"}}>
        <InputLabel id="select-label2">Assist</InputLabel>
        <Select
          labelId="select-label2"
          id="select2"
          value={result.assists}
          onChange={(e) => setResult({...result, assists: e.target.value})}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        </FormControl>
        <FormControl style={{marginTop: "0.5rem"}}>
        <InputLabel id="select-label3">Utv/Min</InputLabel>
        <Select
          labelId="select-label3"
          id="select3"
          value={result.penalties}
          onChange={(e) => setResult({...result, penalties: e.target.value})}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        </FormControl>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Avbryt
          </Button>
          <Button onClick={() => addResult(props.gameId, props.userId, result)} color="primary">
            Lägg till
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PlayerResult