import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Box, Button } from "@material-ui/core";

// Icons
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

// Components
import BackBtn from "../components/BackBtn";
import HomeBtn from "../components/HomeBtn";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        margin: "auto",
        marginTop: "20px",
        textAlign: "center"
    },
    pos: {
        marginBottom: 12,
    },
    star: {
        position: "absolute",
        fontSize: "40px",
        bottom: 5,
        right: 5,
        color: "white",
    },
    color: {
        position: "relative",
        margin: "auto",
        width: "60vw",
        height: "60vw",
        backgroundColor: "#EDFED9"
    }
});

function Thread() {
    const classes = useStyles();

    return (
        <>
            <BackBtn />
            <HomeBtn />

            <Card className={classes.root}>
                <CardContent>
                    <Box className={classes.color}>
                        <StarOutlinedIcon className={classes.star} />
                    </Box>
                    <Typography variant="h5" component="h2">
                        Cocoa - Very Dark
                </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Partial Quantity slider
                </Typography>
                    <Typography variant="body2" component="p">
                        Change Quantity
                <br />
                       Favorite

                        <StarIcon />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to project</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default Thread;