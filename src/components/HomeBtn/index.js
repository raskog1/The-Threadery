import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        float: "right"
    }
}));

function HomeBtn() {
    const classes = useStyles();

    return (
        <Fab color="secondary" aria-label="add" className={classes.margin}>
            <HomeIcon />
        </Fab>
    )
}

export default HomeBtn;
