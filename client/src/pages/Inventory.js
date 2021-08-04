import React, { useState, useEffect, useContext, useRef } from "react";
import API from "../utils/API";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
// import { Fab, TextField } from "@material-ui/core";

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
    marginBottom: 20,
  },
  white: {
    backgroundColor: "white",
    borderRadius: 4,
  },
  topM: {
    marginTop: 7,
  },
}));

function Inventory() {
  const { threads } = useContext(ThreadContext);
  const capture = JSON.parse(localStorage.getItem("capture"));

  const [favThreads, setFavThreads] = useState([]);
  const [ownedThreads, setOwnedThreads] = useState([]);
  const [active, setActive] = useState(
    capture ? capture.status : { all: true, fav: false, owned: false }
  );
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState();

  const isInitialMount = useRef(true);

  // Loads favorites/owned and sets to hooks
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

  // Checks for changes on search hook and filters active view
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const threads = getActive().filter((thread) => {
        return (
          thread.name.toLowerCase().includes(search.toLowerCase()) ||
          thread.num.includes(search)
        );
      });
      setFiltered(threads);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Sets all to active
  const setAll = () => {
    setActive({ all: true, fav: false, owned: false });
    setFiltered([]);
  };

  // Sets favorites to active
  const setFav = () => {
    setActive({ all: false, fav: true, owned: false });
    setFiltered([]);
  };

  // Sets owned to active
  const setOwned = () => {
    setActive({ all: false, fav: false, owned: true });
    setFiltered([]);
  };

  // Returns current active view: all/favorites/owned
  const getActive = () => {
    if (active.owned) {
      return ownedThreads;
    } else if (active.fav) {
      return favThreads;
    } else {
      return threads.dmc;
    }
  };

  // Updates search hook with user input
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.buttons}>
        <BackBtn />
        <SearchBox handleInputChange={handleInputChange} />
        <HomeBtn />
      </div>

      <Results threads={filtered.length > 0 ? filtered : getActive()} />

      <TabBar
        className="fixed-bottom"
        value={() => {
          if (active.fav) return 1;
          else if (active.owned) return 2;
          else return 0;
        }}
        handleAdd={setAll}
        handleFav={setFav}
        handleOwned={setOwned}
      />
    </>
  );
}

export default Inventory;
