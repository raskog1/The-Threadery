import React, { useState, useEffect } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from '@material-ui/core/styles';

// Components
import BackBtn from "../components/BackBtn";
import SearchBtn from "../components/SearchBtn";
import HomeBtn from "../components/HomeBtn";
import Results from "../components/Results";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: "flex",
        justifyContent: "space-between",
    }
}));

function Wishlist() {
    const [wishes, setWishes] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const getThreads = async () => {
            try {
                const wishResponse = await API.getWishes();
                setWishes(wishResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        getThreads();
    }, []);


    return (
        <>
            <div className={classes.buttons} >
                <BackBtn />
                <SearchBtn />
                <HomeBtn />
            </div>
            <Results threads={wishes} />
        </>
    )
}

export default Wishlist;