import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  white: {
    backgroundColor: "white",
    borderRadius: 4,
  },
  topM: {
    marginTop: 40,
  },
}));

function SearchBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.topM}>
      <form className={classes.white} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Search Term"
          variant="outlined"
          value={props.search}
          onChange={props.handleInputChange}
        />
      </form>
    </div>
  );
}

export default SearchBox;
