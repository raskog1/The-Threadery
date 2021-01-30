import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Fab } from "@material-ui/core";

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
        justifyContent: "center"
    },
    handwriting: {
        fontFamily: "'Cedarville Cursive', cursive"
    }
})

function Landing() {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.root}>
                <h2 className={classes.handwriting}>Good morning Amanda,</h2>
                <h3 className={classes.handwriting}>You've got brains in your head, you've got feet in your shoes.  You can steer yourself any way you choose.</h3>
            </Container>
            <Container className={classes.btnContainer}>
                <Fab variant="extended" className={classes.buttons} aria-label="add">Inventory</Fab>
                <Fab variant="extended" className={classes.buttons} aria-label="add">Shopping List</Fab>
                <Fab variant="extended" className={classes.buttons} aria-label="add">Projects</Fab>
            </Container>
        </>
    )
}

export default Landing;