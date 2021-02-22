import React from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer"

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

// Components
import SmThread from "../SmThread";

const useStyles = makeStyles({
    resultBox: {
        height: "70vh",
        overflow: "auto",
        paddingRight: 10,
        paddingLeft: 10
    },
    sansUnderline: {
        textDecoration: "none"
    }
});

function Results(props) {
    const classes = useStyles();

    const tColor = props.threads;

    // List in render will iterate through Row for each index of the data
    const Row = ({ index, key, style }) => (
        <Link to={{
            pathname: "/thread",
            search: "?color=" + tColor[index].num,
            state: { tColor: tColor[index] }
        }}
            className={classes.sansUnderline}
            key={key}
            style={style}
        >
            <SmThread color={tColor[index]} />
        </Link>
    )

    return (
        <Container className={classes.resultBox}>
            <AutoSizer>
                {({ height, width }) => (
                    <List width={width}
                        height={height}
                        itemCount={props.threads.length}
                        itemSize={45}>
                        {Row}
                    </List>
                )}
            </AutoSizer>
        </Container>
    )
}

export default Results;