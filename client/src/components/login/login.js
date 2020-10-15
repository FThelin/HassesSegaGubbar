import React, { useEffect } from "react";
import "./login.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { useUserContext } from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    outline: "none",
  },
}));

export default function Login() {
  const {
    loginUser,
    loggedInUser,
    successfulLogin,
    logoutUser,
  } = useUserContext();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (successfulLogin) {
      setOpen(false);
    }
  }, [successfulLogin]);

  return (
    <div>
      <div className={"login"}>
        {!loggedInUser ? (
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Logga in
          </Button>
        ) : (
          <p>
            {loggedInUser}
            <span className={"divider"}> | </span>
            <span onClick={() => logoutUser()} className={"logout"}>
              Logga ut
            </span>
          </p>
        )}
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
            <form className={classes.root} autoComplete="off">
              <h4>Logga in för att kunna registrera dina resultat.</h4>
              <div className={"login-form"}>
                <TextField
                  required
                  label="Användarnamn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  type="password"
                  label="Lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ padding: "1rem" }}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => loginUser({ username, password })}
                  >
                    Logga in
                  </Button>
                </div>
                {!successfulLogin && (
                  <div className={"error-message"}>
                    <p>Något gick fel med inloggningen</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
