import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
    resultBox: {
        height: "70vh",
        overflow: "auto"
    }
});

function Results() {
    const classes = useStyles();

    return (
        <Container className={classes.resultBox}>


        </Container>
    )
}