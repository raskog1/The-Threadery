import React from "react";
import { useHistory } from "react-router-dom";

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
    let history = useHistory();

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.margin}
            onClick={() => history.goBack()}
        >
            <BackspaceIcon />
        </Fab>
    )
}

export default BackBtn;
