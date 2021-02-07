import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, Fab } from "@material-ui/core";

// Utilities and Context
import UserContext from "../utils/UserContext";

// Components

const useStyles = makeStyles({
    root: {
        width: "90vw",
        height: "60vh",
        marginTop: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        opacity: .8,
        border: "red dashed"
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
    handwriting: {
        fontFamily: "'Cedarville Cursive', cursive"
    },
    sansUnderline: {
        textDecoration: "none"
    }
})

function Landing() {
    const { user } = useContext(UserContext);

    const classes = useStyles();

    return (
        <>
            <Container className={classes.root}>
                <h2 className={classes.handwriting}>Good morning {user.first},</h2>
                <h3 className={classes.handwriting}>You've got brains in your head, you've got feet in your shoes.  You can steer yourself any way you choose.</h3>
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