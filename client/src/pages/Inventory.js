import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Fab, TextField } from "@material-ui/core";

// Utilities and Contextimport 
import ThreadContext from "../utils/ThreadContext";

// Components
import BackBtn from "../components/BackBtn";
import SearchBox from "../components/SearchBox";
import HomeBtn from "../components/HomeBtn";
import Results from "../components/Results";
import TabBar from "../components/TabBar";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 60
    },
    white: {
        backgroundColor: "white",
        borderRadius: 4
    },
    topM: {
        marginTop: 7
    }
}));

function Inventory() {
    const { threads } = useContext(ThreadContext);

    // const [input, setInput] = useState("");
    const [favThreads, setFavThreads] = useState([]);
    const [ownedThreads, setOwnedThreads] = useState([]);
    const [active, setActive] = useState({ all: true, fav: false, owned: false });
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState();

    const classes = useStyles();

    useEffect(() => {
        const getThreads = async () => {
            try {
                //setFiltered(threads.dmc);
                const favResponse = await API.getFavorites();
                setFavThreads(favResponse.data);
                const ownResponse = await API.getOwned();
                setOwnedThreads(ownResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        getThreads();
    }, []);

    useEffect(() => {
        const threads = getActive().filter((thread) => {
            return thread.name.toLowerCase().includes(search);
        });
        setFiltered(threads);
    }, [search]);

    const setAll = () => {
        setActive({ all: true, fav: false, owned: false });
        setFiltered([]);
    }

    const setFav = () => {
        setActive({ all: false, fav: true, owned: false });
        setFiltered([]);
    }

    const setOwned = () => {
        setActive({ all: false, fav: false, owned: true });
        setFiltered([]);
    }

    const getActive = () => {
        if (active.owned && filtered.length === 0) {
            return ownedThreads;
        } else if (active.fav && filtered.length === 0) {
            return favThreads;
        } else if (active.all && filtered.length === 0) {
            return threads.dmc;
        } else {
            return filtered;
        }
    }

    // const sortBy = (style) => {
    //     const threads = getActive();
    //     const sorted = threads.sort(a, b) => {

    // }
    //}
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className={classes.buttons} >
                <BackBtn />
                <SearchBox handleInputChange={handleInputChange} />
                <HomeBtn />
            </div>

            <Results threads={getActive()} />

            <TabBar className="fixed-bottom" handleAdd={setAll} handleFav={setFav} handleOwned={setOwned} />
        </>
    )
}

export default Inventory;