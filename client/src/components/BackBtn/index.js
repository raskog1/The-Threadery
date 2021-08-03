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

function BackBtn(props) {
    const classes = useStyles();
    let history = useHistory();

    function handleBack() {
        // if (props) {
        //     console.log("props exist")
        //     history.push(
        //         "/inventory"

        //     )
        // } else {
        console.log("no props")
        history.goBack();
        // }
    }

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.margin}
            onClick={handleBack}
        >
            <BackspaceIcon />
        </Fab>
    )
}

export default BackBtn;
