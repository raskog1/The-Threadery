import React from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles({
    flexPaper: {
        display: "flex",
        marginBottom: "5px",
        borderRadius: "20px",
        justifyContent: "flex-start"
    },
    colorBox: {
        height: "30px",
        width: "35px",
        margin: "5px",
        borderRadius: "15px"
    },
    fixMargin: {
        lineHeight: "30px",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "10px",
        marginRight: "10px",
        fontSize: "14px"
    },
    sansUnderline: {
        textDecoration: "none"
    }
});

function SmThread(props) {
    const classes = useStyles();

    return (

        <Paper square className={classes.flexPaper} data-id={props.color.num}>
            <Box
                style={{ backgroundColor: props.color.color }}
                className={classes.colorBox}
            ></Box>
            <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center">
                <Grid item>
                    <h3 className={classes.fixMargin}>{props.color.num}</h3>
                </Grid>
                <Grid item>
                    <h3 className={classes.fixMargin}>{props.color.name}</h3>
                </Grid>
                <Grid item>
                    <h3 className={classes.fixMargin}>{props.color.quantity}</h3>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default SmThread;
