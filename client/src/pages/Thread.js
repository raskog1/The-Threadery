import React, { useState, useEffect, useRef } from 'react';
import API from "../utils/API";

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent, Slide, Snackbar } from '@material-ui/core';
import { Box, Button, IconButton, Slider } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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
        color: tColor.color,
        count: tColor.count || 0,
        partial: tColor.partial || 0,
        note: tColor.note || "",
        favorite: tColor.favorite || false,
        wishlist: tColor.wishlist || false,
        wishCount: tColor.wishCount || 0,
        brand: "DMC"
    });
    const [open, setOpen] = useState(false);

    // Prevents [count, partial] useEffect on initial mount
    const isInitialMount = useRef(true);

    // If owned/favorite are clicked from all inventory, it does not populate info without the useEffect...

    // Attemts to grab thread info from user's drawer to populate color hook
    useEffect(() => {
        const getColor = async () => {
            try {
                const query = document.location.search;
                const colorId = query.split("=")[1];

                if (colorId) {
                    const currentThread = await API.getOne(colorId);
                    if (currentThread.data) {
                        setColor(currentThread.data)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getColor();
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (color.count > 0 || color.partial > 0) {
                API.addOne(setModel());
            } else {
                API.deleteOne(color.num);
            }
        }
    }, [color.count, color.partial])

    const classes = useStyles();

    const onChange = (e, val) => setColor({ ...color, partial: val });

    // Returns empty or filled star based on favorite value
    const checkFav = () => {
        // Have to manually set favorite since setColor does not execute in time
        if (color.favorite) {
            return <StarIcon
                className={classes.favStar}
                onClick={async () => {
                    let favThread = setModel();
                    favThread = ({ ...favThread, favorite: false })
                    setColor({ ...color, favorite: !color.favorite });
                    API.addOne(favThread);
                }}
            />
        } else if (!color.favorite) {
            return <StarOutlinedIcon
                className={classes.star}
                onClick={async () => {
                    let favThread = setModel();
                    favThread = ({ ...favThread, favorite: true })
                    setColor({ ...color, favorite: !color.favorite });
                    API.addOne(favThread);
                }}
            />
        }
    }

    // Handle "clickaway" event for Snackbar
    const handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    // Constructs object for storage in database
    const setModel = () => {
        const newThread = {
            num: color.num,
            name: color.name,
            color: color.color,
            partial: color.partial,
            count: color.count,
            note: color.note,
            favorite: color.favorite,
            wishlist: color.wishlist,
            wishCount: color.wishCount,
            brand: "DMC"
        }
        return newThread;
    };

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
                            // value={partial}  This sets the slider on an owned thread, but disables sliding
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={color.partial}
                            step={25}
                            onChangeCommitted={(e, val) => onChange(e, val)}
                        />
                        <Typography component="p">Change Full Quantity</Typography>
                        <Box className={classes.center}>
                            <IconButton
                                className={classes.counterBtn}
                                onClick={() => setColor({ ...color, count: color.count + 1 })}
                            >
                                <AddIcon />
                            </IconButton>
                            <h1 className={classes.counter}>{color.count}</h1>
                            <IconButton
                                className={classes.counterBtn}
                                onClick={() => (color.count > 0) ? setColor({ ...color, count: color.count - 1 }) : setColor({ ...color, count: 0 })}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </Box>
                    </Box>

                </CardContent>
                <CardActions>
                    <Button
                        className={classes.auto}
                        size="small"
                        onClick={() => {
                            API.addOne({ ...color, wishlist: true });
                            setColor({ ...color, wishlist: !color.wishlist });
                            setOpen(true);
                        }}
                        disabled={color.wishlist ? true : false}
                    >
                        {color.wishlist ? "Wishlisted" : "Add to Wishlist"}
                    </Button>
                </CardActions>
            </Card>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                TransitionComponent={Slide}
                onClose={handleClose}
            >
                <MuiAlert
                    elevation={20}
                    variant="filled"
                    onClose={handleClose}
                    severity="success"
                >
                    Added to Wishlist
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export default Thread;