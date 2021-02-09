import React, { useState } from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Popper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        backgroundColor: "#88C53A",
        border: "3px white dashed"
    },
    popperdiv: {
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 10
    }
}));

function SearchBtn() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <>
            <Fab
                color="secondary"
                aria-label="add"
                className={classes.margin}
                onClick={handleClick}
            >
                <SearchIcon />
            </Fab>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.popperdiv} >
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Search Term" variant="outlined" />
                    </form>
                </div>
            </Popper>
        </>
    )
}

export default SearchBtn;