import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, Fab } from "@material-ui/core";

// Utilities and Context
import quotes from "../assets/quotes.json";
import UserContext from "../utils/UserContext";

// Styling
const useStyles = makeStyles({
    root: {
        width: "90vw",
        height: "60vh",
        marginTop: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        opacity: .8,
        border: "red dashed",
        fontFamily: "'Cedarville Cursive', cursive",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll"
    },
    buttons: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        border: "red dashed",
        backgroundColor: "#aebedf"
    },
    btnContainer: {
        height: "35vh",
        width: "70vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    sansUnderline: {
        textDecoration: "none"
    }
})

function Landing() {
    const { user } = useContext(UserContext);

    const [quote, setQuote] = useState({})

    const classes = useStyles();

    useEffect(() => {
        setQuote(randomQ());
    }, []);

    const randomQ = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    const getTime = () => {
        const time = new Date();
        const hour = time.getHours();
        if (hour > 4 && hour < 12) {
            return "Good morning"
        } else if (hour > 11 && hour < 18) {
            return "Good afternoon"
        } else if (hour > 17 && hour < 23) {
            return "Good evening"
        } else {
            return "Good witching hour"
        }
    }

    return (
        <>
            <Container className={classes.root}>
                <h2>{getTime()} {user.first},</h2>
                <div>
                    <h2 style={{ fontSize: 20 }}>{quote.text}</h2>
                    <h2 style={{ textAlign: "right", paddingRight: 20 }}>- {quote.author}</h2>
                </div>
            </Container>
            <Container className={classes.btnContainer}>
                <Link to="/inventory" className={classes.sansUnderline}>
                    <Fab variant="extended" className={classes.buttons} aria-label="add">Inventory</Fab>
                </Link>
                <Link to="/wishlist" className={classes.sansUnderline}>
                    <Fab variant="extended" className={classes.buttons} aria-label="add">Wishlist</Fab>
                </Link>
                <Link to="/projects" className={classes.sansUnderline}>
                    <Fab variant="extended" className={classes.buttons} aria-label="add">Projects</Fab>
                </Link>
            </Container>
        </>
    )
}

export default Landing;