import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        backgroundColor: "blue"
    }
}));

function BackBtn() {
    const classes = useStyles();

    return (
        <Fab color="secondary" aria-label="add" className={classes.margin}>
            <BackspaceIcon />
        </Fab>
    )
}

export default BackBtn;
