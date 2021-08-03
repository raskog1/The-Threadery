import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Utilities and Context
import API from "../utils/API";
import { AuthContext } from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import setAuthToken from "../utils/setAuthToken";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Slide,
  Snackbar,
  TextField,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Components

// Styles
const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    margin: "auto",
    marginTop: "20vh",
    textAlign: "center",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    border: "2px red dashed",
  },
  mBottom: {
    marginBottom: 10,
  },
});

function Login() {
  const [credentials, setCredentials] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [type, setType] = useState({
    login: true,
    signup: false,
  });
  const [open, setOpen] = useState(false);

  // Other Variables
  const { auth, setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const { first, last, email, password } = credentials;

  const classes = useStyles();

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  // Handles both login and signup
  const onSubmit = async (e) => {
    e.preventDefault();

    let body, res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Determine if user is signing up or logging in to dictate API call
      if (type.login) {
        body = JSON.stringify({ email, password });
        res = await axios.post("/api/auth", body, config);
      } else {
        body = JSON.stringify({ first, last, email, password });
        res = await axios.post("/api/users", body, config);
      }

      axios.defaults.headers.common["x-auth-token"] = res.data.user.token;

      // setUser MUST fire before setAuth to get desired info on login
      await setUser({
        first: res.data.user.first,
        last: res.data.user.last,
        email: res.data.user.email,
      });

      if (type.signup) {
        API.createCaboodle();
      }

      setAuth({
        ...auth,
        isAuthenticated: true,
        loading: false,
        token: res.data.user.token,
      });
    } catch (error) {
      // Displays error popup for user
      setOpen(true);

      setAuth({ ...auth, isAuthenticated: false, token: null });
      console.error(error);
    }
  };

  // Handle "clickaway" event for Snackbar
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Conditionally render name fields for signup
  const conditionalFields = () => {
    if (type.signup) {
      return (
        <>
          <TextField
            className={classes.mBottom}
            name="first"
            variant="outlined"
            label="First Name"
            value={first}
            onChange={(e) => onChange(e)}
          />
          <br />
          <TextField
            className={classes.mBottom}
            name="last"
            variant="outlined"
            label="Last Name"
            value={last}
            onChange={(e) => onChange(e)}
          />
          <br />
        </>
      );
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <form noValidate autoComplete="on" onSubmit={(e) => onSubmit(e)}>
            {conditionalFields()}
            <TextField
              className={classes.mBottom}
              name="email"
              variant="outlined"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <TextField
              className={classes.mBottom}
              name="password"
              variant="outlined"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <br />

            <Button
              color="secondary"
              size="medium"
              variant={type.signup ? "contained" : "text"}
              onClick={(e) =>
                type.signup
                  ? onSubmit(e)
                  : setType({ login: !type.login, signup: !type.signup })
              }
              style={{ float: "left" }}
            >
              Sign Up
            </Button>
            <Button
              color="primary"
              size="medium"
              variant={type.login ? "contained" : "text"}
              onClick={(e) =>
                type.login
                  ? onSubmit(e)
                  : setType({ login: !type.login, signup: !type.signup })
              }
              style={{ float: "right" }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        TransitionComponent={Slide}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={20}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          Invalid Credentials
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Login;
