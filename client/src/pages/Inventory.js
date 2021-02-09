import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core"

// Utilities and Contextimport 
import ThreadContext from "../utils/ThreadContext";

// Components
import BackBtn from "../components/BackBtn";
import SearchBtn from "../components/SearchBtn";
import HomeBtn from "../components/HomeBtn";
import Results from "../components/Results";
import TabBar from "../components/TabBar";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: "flex",
        justifyContent: "space-between",
    },
    popperdiv: {
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 10
    }
}));

function Inventory() {
    const { threads } = useContext(ThreadContext);

    // const [input, setInput] = useState("");
    const [favThreads, setFavThreads] = useState([]);
    const [ownedThreads, setOwnedThreads] = useState([]);
    const [active, setActive] = useState({ all: true, fav: false, owned: false });

    const classes = useStyles();

    useEffect(() => {
        const getThreads = async () => {
            try {
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
            return threads.dmc;
        }
    }

    // const handleChange = (event) => {
    //     setInput(event.target.value);
    // }

    // const handleSubmit = (event) => {
    //     console.log(input)
    // }

    return (
        <>
            <div className={classes.buttons} >
                <BackBtn />
                <SearchBtn />
                <HomeBtn />
            </div>

            <div className={classes.popperdiv} >
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search Term" variant="outlined" />
                </form>
            </div>

            <Results threads={getActive()} />

            <TabBar className="fixed-bottom" handleAdd={setAll} handleFav={setFav} handleOwned={setOwned} />
        </>
    )
}

export default Inventory;