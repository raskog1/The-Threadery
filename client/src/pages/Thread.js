import React, { useState } from 'react';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Box, Button, IconButton, Slider } from "@material-ui/core";

// Icons
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

// Components
import BackBtn from "../components/BackBtn";
import HomeBtn from "../components/HomeBtn";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        margin: "auto",
        marginTop: "20px",
        textAlign: "center",
        borderRadius: "10px"
    },
    bottom: {
        marginBottom: "35px"
    },
    auto: {
        margin: "auto"
    },
    center: {
        display: "flex",
        justifyContent: "center"
    },
    counter: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
    },
    counterBtn: {
        borderRadius: "1em",
        backgroundColor: "#aebedf",
        marginLeft: "20px",
        marginRight: "20px"
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
        backgroundColor: "#552014"
    }
});

const PrettoSlider = withStyles({
    root: {
        color: '#aebedf',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 10,
        borderRadius: 5,
    },
    rail: {
        height: 10,
        borderRadius: 5,
    },
})(Slider);

function Thread() {
    const [count, setCount] = useState({
        whole: 0,
        partial: 0,
    });

    const classes = useStyles();

    const onChange = (e, val) => setCount({ ...count, partial: val });

    return (
        <>
            <BackBtn />
            <HomeBtn />

            <Card className={classes.root}>
                <CardContent>
                    <Box className={classes.bottom}>
                        <Box className={classes.color}>
                            <StarOutlinedIcon className={classes.star} />
                        </Box>
                        <Typography variant="h5" component="h2">
                            Cocoa - Very Dark
                    </Typography>
                    </Box>
                    <Box>
                        <Typography component="p">Partial Quantity</Typography>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={0}
                            step={25}
                            name="slider"
                            onChangeCommitted={(e, val) => onChange(e, val)}
                        />
                        <Typography component="p">Change Full Quantity</Typography>
                        <Box className={classes.center}>
                            <IconButton
                                className={classes.counterBtn}
                                onClick={() => setCount({ ...count, whole: (count.whole + 1) })}
                            >
                                <AddIcon />
                            </IconButton>
                            <h1 className={classes.counter}>{count.whole}</h1>
                            <IconButton
                                className={classes.counterBtn}
                                onClick={() => (count.whole > 0) ? setCount({ ...count, whole: count.whole - 1 }) : setCount({ ...count, whole: 0 })}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button className={classes.auto} size="small">Add to project</Button>
                </CardActions>

            </Card>
        </>
    );
}

export default Thread;