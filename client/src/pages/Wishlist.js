import React, { useState, useEffect } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

// Components
import BackBtn from "../components/BackBtn";
import SearchBox from "../components/SearchBox";
import HomeBtn from "../components/HomeBtn";
import Results from "../components/Results";

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

function Wishlist() {
    const [wishes, setWishes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState();
    const classes = useStyles();

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

    useEffect(() => {
        const newWishes = wishes.filter((thread) => {
            return thread.name.toLowerCase().includes(search);
        });
        setFiltered(newWishes);
    }, [search]);

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
            <Results threads={filtered} />
        </>
    )
}

export default Wishlist;