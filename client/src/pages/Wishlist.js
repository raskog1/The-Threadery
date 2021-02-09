import React, { useState, useEffect } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, Slide, Snackbar } from "@material-ui/core";


// Components
import BackBtn from "../components/BackBtn";
import HomeBtn from "../components/HomeBtn";
import SmThread from "../components/SmThread";

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

const testProps = [
    {
        "num": 1,
        "name": "White Tin",
        "color": "#EFEEF0",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 2,
        "name": "Tin",
        "color": "#C5C4C9",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 3,
        "name": "Tin - Medium",
        "color": "#B0B0B5",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 4,
        "name": "Tin - Dark",
        "color": "#9C9B9D",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 5,
        "name": "Driftwood - Light",
        "color": "#E3CCBE",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 6,
        "name": "Driftwood - Medium Light",
        "color": "#DCC6B8",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 7,
        "name": "Driftwood",
        "color": "#CCB8AA",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 8,
        "name": "Driftwood - Dark",
        "color": "#9D7D71",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 9,
        "name": "Cocoa - Very Dark",
        "color": "#552014",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 10,
        "name": "Tender Green - Very Light",
        "color": "#EDFED9",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 11,
        "name": "Tender Green - Light",
        "color": "#E2EDB5",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    },
    {
        "num": 12,
        "name": "Tender Green",
        "color": "#CDD99A",
        "quantity": 0,
        "desiredQty": 0,
        "favorite": false,
        "wanted": false,
        "projects": []
    }
]

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
            <BackBtn />
            <HomeBtn />

            <Container className={classes.threads}>
                {wishes.map((tColor) => (
                    <a href="./thread" className={classes.sansUnderline}>
                        <SmThread color={tColor} />
                    </a>
                ))}
            </Container>
        </>
    )
}

export default Wishlist;