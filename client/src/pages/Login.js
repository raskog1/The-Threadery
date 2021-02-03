import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Utilities and Context
import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";

// Components
import { Button, TextField } from "@material-ui/core";

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    // Other Variables
    const { authData, setAuth } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const { email, password } = credentials;

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
                username: res.data.user.username,
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

    return (
        <>
            <form noValidate autoComplete="on" onSubmit={(e) => onSubmit(e)}>
                <TextField
                    name="email"
                    variant="outlined"
                    color="primary"
                    label="Email"
                    value={email}
                    onChange={(e) => onChange(e)}
                />
                <br />
                <TextField
                    name="password"
                    variant="outlined"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => onChange(e)}
                />
                <br />
                <Button type="submit" variant="contained" color="primary" size="large">
                    Login
            </Button>
            </form>
        </>
    );
}

export default Login;