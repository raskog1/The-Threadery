import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

// Components
import SmThread from "../SmThread";

const useStyles = makeStyles({
    resultBox: {
        height: "70vh",
        overflow: "auto",
    },
    sansUnderline: {
        textDecoration: "none"
    }
});

function Results(props) {
    const classes = useStyles();

    return (
        <Container className={classes.resultBox}>
            {props.threads.map((tColor) => (
                <a href="./thread" className={classes.sansUnderline}>
                    <SmThread color={tColor} />
                </a>
            ))}
        </Container>
    )
}

export default Results;