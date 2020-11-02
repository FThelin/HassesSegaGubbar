import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useUserContext } from "../../context/userContext";
import './login.css'

export default function ChangePassword() {
  const [open, setOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [passwordsDoMatch, setPasswordsDoMatch] = React.useState(true);

  const {
    loggedInUser,
    updateUser
  } = useUserContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkIfPasswordsMatch = () => {
      if (newPassword === newPassword2) {
          updateUser(loggedInUser._id, newPassword)
          setPasswordsDoMatch(true)
          setOpen(false)
      } else {
          setPasswordsDoMatch(false)
      }
  }

  return (
    <div>
      <span className={"username"} onClick={handleClickOpen}>
        {loggedInUser.username}
      </span>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{loggedInUser.username}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ändra ditt lösenord här.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nytt lösenord"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Fyll i samma igen"
            type="password"
            fullWidth
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Avbryt
          </Button>
          <Button onClick={() => checkIfPasswordsMatch()} color="primary">
            Ändra
          </Button>
        </DialogActions>
          {passwordsDoMatch ? null : <p style={{color: "red", textAlign:"center"}}>Lösenorden matchar inte</p>}  
      </Dialog>
    </div>
  );
}