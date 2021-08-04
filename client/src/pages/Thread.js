import React, { useState, useEffect, useRef } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, CardActions, CardContent, Snackbar } from "@material-ui/core";
import { Box, Button, IconButton, Slide } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Icons
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import StarIcon from "@material-ui/icons/Star";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

// Components
import BackBtn from "../components/BackBtn";
import HomeBtn from "../components/HomeBtn";
import PSlider from "../components/PSlider";

// Styles
const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    margin: "auto",
    textAlign: "center",
    borderRadius: "10px",
  },
  bottom: {
    marginBottom: "35px",
  },
  auto: {
    margin: "auto",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  counter: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  counterBtn: {
    borderRadius: "1em",
    marginLeft: "20px",
    marginRight: "20px",
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
    backgroundColor: "#fff",
  },
});

export default function Thread(props) {
  const { tColor, state } = props.location.state;

  // Tracks slider value while mouse is held down
  const [sliderValue, setSlider] = useState(tColor.partial || 0);

  const [color, setColor] = useState({
    num: tColor.num,
    name: tColor.name,
    color: tColor.color,
    count: tColor.count || 0,
    partial: tColor.partial || sliderValue,
    note: tColor.note || "",
    favorite: tColor.favorite || false,
    wishlist: tColor.wishlist || false,
    wishCount: tColor.wishCount || 0,
    brand: "DMC",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  // Prevents [count, partial] useEffect on initial mount
  const isInitialMount = useRef(true);

  // If owned/favorite are clicked from all inventory, it does not populate info without the useEffect...

  // Attempts to grab thread info from user's drawer to populate color hook
  useEffect(() => {
    const getColor = async () => {
      try {
        const query = document.location.search;
        const colorId = query.split("=")[1];

        if (colorId) {
          const currentThread = await API.getOne(colorId);
          if (currentThread.data) {
            setColor(currentThread.data);
            setSlider(currentThread.data.partial);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color.count, color.partial]);

  // Updates 'partial' field on slider change, which updates database
  const onChangeCommitted = (e, val) => setColor({ ...color, partial: val });

  // Updates slider value without commitment
  const onChange = (e, val) => setSlider(val);

  // Returns empty or filled star based on favorite value
  const checkFav = () => {
    // Have to manually set favorite since setColor does not execute in time
    if (color.favorite) {
      return (
        <StarIcon
          className={classes.favStar}
          onClick={async () => {
            let favThread = setModel();
            favThread = { ...favThread, favorite: false };
            setColor({ ...color, favorite: !color.favorite });
            API.addOne(favThread);
          }}
        />
      );
    } else if (!color.favorite) {
      return (
        <StarOutlinedIcon
          className={classes.star}
          onClick={async () => {
            let favThread = setModel();
            favThread = { ...favThread, favorite: true };
            setColor({ ...color, favorite: !color.favorite });
            API.addOne(favThread);
          }}
        />
      );
    }
  };

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
      brand: "DMC",
    };
    return newThread;
  };

  // Toggles snackbar color/message while updating wishlist inventory
  const toggleWish = () => {
    if (!color.wishlist) {
      API.addOne({ ...color, wishlist: true });
      setMessage("Added to Wishlist");
      setSeverity("success");
    } else {
      API.addOne({ ...color, wishlist: false, wishCount: 0 });
      setMessage("Removed from Wishlist");
      setSeverity("info");
    }

    setColor({ ...color, wishlist: !color.wishlist });
    setOpen(true);
  };

  const classes = useStyles();

  return (
    <>
      <BackBtn state={state} />
      <HomeBtn />

      <Card className={classes.root}>
        <CardContent>
          <Box className={classes.bottom}>
            <Box
              className={classes.color}
              style={{ backgroundColor: color.color }}
            >
              {checkFav()}
            </Box>
            <Typography variant="h5" component="h2">
              {color.name}
            </Typography>
          </Box>

          <Box>
            <Typography component="p">Partial Quantity</Typography>
            <PSlider
              sliderValue={sliderValue}
              onChange={onChange}
              onChangeCommitted={onChangeCommitted}
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
                onClick={() =>
                  color.count > 0
                    ? setColor({ ...color, count: color.count - 1 })
                    : setColor({ ...color, count: 0 })
                }
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button className={classes.auto} size="small" onClick={toggleWish}>
            {color.wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
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
          severity={severity}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
