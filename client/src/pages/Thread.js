import React, { useState, useEffect } from 'react';
import API from "../utils/API";

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Box, Button, IconButton, Slider } from "@material-ui/core";

// Icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import StarIcon from '@material-ui/icons/Star';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

// Components
import BackBtn from "../components/BackBtn";
import HomeBtn from "../components/HomeBtn";

// Styles
const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        margin: "auto",
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
    favStar: {
        position: "absolute",
        fontSize: "40px",
        bottom: 5,
        right: 5,
        color: "#d4af37",
    },
    color: {
        position: "relative",
        margin: "auto",
        width: "60vw",
        height: "60vw",
        backgroundColor: "#fff"
    }
});

// Slider Component
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

function Thread(props) {
    const { tColor } = props.location.state;

    const [color, setColor] = useState({
        num: tColor.num,
        name: tColor.name,
        color: tColor.color
    });
    const [count, setCount] = useState(0);
    const [partial, setPartial] = useState(0.0);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const getColor = async () => {
            try {
                const query = document.location.search;
                const colorId = query.split("=")[1];

                if (colorId) { //try to get from owned/fav first, if doesn't exist, get from masterfile  
                    const currentThread = await API.getOne(colorId);
                    console.log(currentThread);
                    if (currentThread.data) {
                        const { num, name, color, count, partial, favorite } = currentThread.data;
                        setColor({ num, name, color });
                        setFavorite(favorite);
                        setPartial(partial);
                        setCount(count);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getColor();
    }, []);

    useEffect(() => {
        if (count > 0 || partial > 0) {
            API.addOne(setModel());
        } else {
            API.deleteOne(color.num)
        }
    }, [count, partial])

    useEffect(() => {
        API.addOwned(setModel());
    }, [favorite])

    const classes = useStyles();

    const onChange = (e, val) => setPartial(val);

    const checkFav = () => {
        if (favorite) {
            return <StarIcon
                className={classes.favStar}
                onClick={() => setFavorite(!favorite)}
            />
        } else if (!favorite) {
            return <StarOutlinedIcon
                className={classes.star}
                onClick={() => setFavorite(!favorite)}
            />
        }
    }

    const setModel = () => {
        const newThread = {
            num: color.num,
            name: color.name,
            color: color.color,
            partial: partial,
            count: count,
            favorite: favorite,
            brand: "DMC"
        }
        return newThread;
    }

    return (
        <>
            <BackBtn />
            <HomeBtn />

            <Card className={classes.root}>
                <CardContent>
                    <Box className={classes.bottom}>
                        <Box className={classes.color} style={{ backgroundColor: color.color }}>
                            {checkFav()}
                        </Box>
                        <Typography variant="h5" component="h2">
                            {color.name}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography component="p">Partial Quantity</Typography>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={partial}
                            step={25}
                            onChangeCommitted={(e, val) => onChange(e, val)}
                        />
                        <Typography component="p">Change Full Quantity</Typography>
                        <Box className={classes.center}>
                            <IconButton
                                className={classes.counterBtn}
                                onClick={() => setCount(count + 1)}
                            >
                                <AddIcon />
                            </IconButton>
                            <h1 className={classes.counter}>{count}</h1>
                            <IconButton
                                className={classes.counterBtn}
                                onClick={() => (count > 0) ? setCount(count - 1) : setCount(0)}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </Box>
                    </Box>

                </CardContent>
                <CardActions>
                    <Button className={classes.auto} size="small">Add to wishlist</Button>
                </CardActions>

            </Card>
        </>
    );
}

export default Thread;