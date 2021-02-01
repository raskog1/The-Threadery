import React, { useState, useEffect } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, TextField } from "@material-ui/core";

// Components
import BackBtn from "../components/BackBtn";
import HomeBtn from "../components/HomeBtn";
import Results from "../components/Results";
import TabBar from "../components/TabBar";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        margin: "auto",
        width: "90%",
        position: "relative",
        bottom: 10
    },
    threads: {
        height: "70vh",
        overflow: "auto",
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    sortBtn: {
        height: 24
    },
    sansUnderline: {
        textDecoration: "none"
    }
});

function Inventory() {
    const [input, setInput] = useState("");
    const [allThreads, setAllThreads] = useState({ threads: [], isFetching: false })
    const [favThreads, setFavThreads] = useState([]);
    const [ownedThreads, setOwnedThreads] = useState([]);
    const [active, setActive] = useState({ all: true, fav: false, owned: false });

    useEffect(() => {
        const getThreads = async () => {
            try {
                setAllThreads({ ...allThreads, isFetching: true })
                const allResponse = await API.getAllDMC();
                setAllThreads({ threads: allResponse.data, isFetching: false })
                // const favResponse = await API.getFavorites();
                // setFavThreads(favResponse);
                // const ownResponse = await API.getOwned();
                // setOwnedThreads(ownResponse);
            } catch (error) {
                console.log(error);
                setAllThreads({ ...allThreads, isFetching: false })
            }
        };
        getThreads();
    }, []);

    const classes = useStyles();

    const setAll = () => {
        setActive({ all: true, fav: false, owned: false })
    }

    const setFav = () => {
        setActive({ all: false, fav: true, owned: false })
    }

    const setOwned = () => {
        setActive({ all: false, fav: false, owned: true })
    }

    const getActive = () => {
        if (active.owned) {
            return ownedThreads;
        } else if (active.fav) {
            return favThreads;
        } else {
            return allThreads.threads;
        }
    }

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = (event) => {
        console.log(input)
    }

    return (
        <>
            <BackBtn />
            <HomeBtn />
            {/* <Paper className={classes.root}>
                <TextField
                    fullWidth
                    id="outlined-helperText"
                    type="search"
                    label="Search by id or name..."
                    // variant="outlined"
                    size="small"
                />
            </Paper> */}

            <Results threads={getActive()} />

            <TabBar className="fixed-bottom" handleAdd={setAll} handleFav={setFav} handleOwned={setOwned} />
        </>
    )
}

export default Inventory;