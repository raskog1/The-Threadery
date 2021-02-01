import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        float: "right",
        border: "3px white dashed"
    }
}));

function HomeBtn() {
    const classes = useStyles();

    return (
        <a href="/home">
            <Fab color="secondary" aria-label="add" className={classes.margin}>
                <HomeIcon />
            </Fab>
        </a>
    )
}

export default HomeBtn;
