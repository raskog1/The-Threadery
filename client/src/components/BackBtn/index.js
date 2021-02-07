import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        backgroundColor: "blue",
        border: "3px white dashed"
    }
}));

function BackBtn() {
    const classes = useStyles();

    return (
        <Link to="/inventory">
            <Fab color="secondary" aria-label="add" className={classes.margin}>
                <BackspaceIcon />
            </Fab>
        </Link>
    )
}

export default BackBtn;
