import React, { useState, useEffect, useRef } from "react";
import API from "../utils/API";
import axios from "axios";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
// import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

// Components
import BackBtn from "../components/BackBtn";
import SearchBox from "../components/SearchBox";
import HomeBtn from "../components/HomeBtn";
import Results from "../components/Results";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 40
    },
    white: {
        backgroundColor: "white",
        borderRadius: 4
    },
    topM: {
        marginTop: 7
    }
}));

function Wishlist() {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

    const [wishes, setWishes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState();

    const isInitialMount = useRef(true);

    // Loads wishlist for current user on page load
    useEffect(() => {
        const getThreads = async () => {
            try {
                const wishResponse = await API.getWishes();
                setWishes(wishResponse.data);
                setFiltered(wishResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        getThreads();
    }, []);

    // Checks for changes on search hook and filters wishlist
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const newWishes = wishes.filter((thread) => {
                return thread.name.toLowerCase().includes(search.toLowerCase()) || thread.num.includes(search);
            });
            setFiltered(newWishes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Updates search hook with user input
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.buttons} >
                <BackBtn />
                <SearchBox handleInputChange={handleInputChange} />
                <HomeBtn />
            </div>
            <Results threads={filtered.length > 0 ? filtered : wishes} />
        </>
    )
}

export default Wishlist;