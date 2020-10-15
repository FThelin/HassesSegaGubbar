import React from 'react'
import './login.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  paper: {
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),    
    borderRadius: 10,
    outline: "none"
  },
}));

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <div className={"login"}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>Logga in</Button>           
        </div>
      <Modal               
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <form className={classes.root} validate autoComplete="off" onSubmit={() => alert("inloggad")}>
            <h4>Logga in för att kunna registrera dina resultat.</h4>
            <div className={"login-form"}>
                <TextField required id="standard-basic" label="Användarnamn" />
                <TextField required id="standard-basic" type="password" label="Lösenord" />
                <div style={{padding: "1rem"}}>
                    <Button type="submit" variant="contained" color="primary">Logga in</Button>
                </div>
            </div>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
