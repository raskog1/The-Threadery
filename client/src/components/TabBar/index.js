import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Paper, Tab, Tabs } from "@material-ui/core";

import HistoryIcon from '@material-ui/icons/History';
import StarIcon from '@material-ui/icons/Star';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        margin: "0 auto",
        width: "90%",
        position: "fixed",
        bottom: 10,
        left: 0,
        right: 0,
        borderRadius: 50,
        border: "2px red dashed"
    },
    tabs: {
        position: "relative",
        margin: "auto",
    }
});

function TabBar(props) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root} elevation="24">
            <Tabs
                value={value}
                className={classes.tabs}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="#d4af37"
                textColor="#d4af37"
                aria-label="icon label tabs example"
            >
                <Tab label="ALL" onClick={props.handleAdd} />
                <Divider orientation="vertical" flexItem />
                <Tab icon={<StarIcon style={{ color: "#d4af37" }} onClick={props.handleFav} />} />
                <Divider orientation="vertical" flexItem />
                <Tab label="OWNED" onClick={props.handleOwned} />
            </Tabs>
        </Paper>
    )
}

export default TabBar;