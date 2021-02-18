import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

// Components
import SmThread from "../SmThread";

const useStyles = makeStyles({
    resultBox: {
        height: "70vh",
        overflow: "auto",
        paddingRight: 10,
        paddingLeft: 10
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
                <Link to={{
                    pathname: "/thread",
                    search: "?color=" + tColor.num,
                    state: { tColor }
                }}
                    className={classes.sansUnderline}
                    key={tColor.num}
                >
                    <SmThread color={tColor} />
                </Link>
            ))}
        </Container>
    )
}

export default Results;