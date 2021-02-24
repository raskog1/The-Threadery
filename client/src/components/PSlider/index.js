import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";

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

function PSlider(props) {
    return (
        <PrettoSlider
            value={props.sliderValue} //This sets the slider on an owned thread, but disables sliding
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            //defaultValue={props.partial}
            marks={true}
            step={25}
            onChange={(e, val) => props.onChange(e, val)}
            onChangeCommitted={(e, val) => props.onChangeCommitted(e, val)}
        />
    )
}

export default PSlider;