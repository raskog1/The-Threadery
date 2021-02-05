import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Utilities and Context
import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, TextField } from "@material-ui/core";

// Components

// Styles
const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        margin: "auto",
        marginTop: "30vh",
        textAlign: "center",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        border: "2px red dashed"
    },
    mBottom: {
        marginBottom: 10
    }
})

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [type, setType] = useState({
        login: true,
        signup: false
    })

    // Other Variables
    const { authData, setAuth } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const { email, password } = credentials;

    const classes = useStyles();

    const onChange = (e) =>
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post("/api/auth", body, config);
            if (res.data.user.token) {
                localStorage.setItem("token", res.data.user.token);
            }

            axios.defaults.headers.common["x-auth-token"] = res.data.user.token;

            // setUser MUST fire before setAuth to get desired info on login
            await setUser({
                first: res.data.user.first,
                // last: res.data.user.last,
                // email: res.data.user.email
            });

            setAuth({
                ...authData,
                isAuthenticated: true,
                loading: false,
                token: localStorage.getItem("token"),
            });
        } catch (error) {
            // Displays error popup for user
            //setOpen(true);

            localStorage.removeItem("token");
            setAuth({ ...authData, isAuthenticated: false, token: null });
            console.error(error);
        }
    };

    if (authData.isAuthenticated) {
        return <Redirect to="/home" />;
    }

    const onSignup = () => {
        console.log("signing up");
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <form noValidate autoComplete="on" onSubmit={(e) => onSubmit(e)}>
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

                    <Button color="secondary" size="medium" variant={type.signup ? "contained" : "text"}
                        onClick={() => type.signup ? onSignup() : setType({ login: !type.login, signup: !type.signup })}
                        style={{ float: "left" }}>
                        Sign Up
                    </Button>
                    <Button color="primary" size="medium" variant={type.login ? "contained" : "text"}
                        onClick={(e) => type.login ? onSubmit(e) : setType({ login: !type.login, signup: !type.signup })}
                        style={{ float: "right" }}>
                        Login
                    </Button>

                </form>
            </CardContent>
        </Card>
    );
}

export default Login;