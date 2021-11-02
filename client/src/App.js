import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

// Utilities and createContext
import API from "./utils/API";
import { AuthProvider } from "./utils/AuthContext";
import setAuthToken from "./utils/setAuthToken";
import UserContext from "./utils/UserContext";
import ThreadContext from "./utils/ThreadContext";
import "./App.css";

// Pages
import Private from "./routing/Private";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Thread from "./pages/Thread";
import Inventory from "./pages/Inventory";
import Projects from "./pages/Projects";
import Wishlist from "./pages/Wishlist";
import Entry from "./pages/Entry";

function App() {
  const [userState, setUserState] = useState({
    first: "",
    favorites: [],
    owned: [],
    wishlist: [],
    history: {
      search: "",
      active: { all: true, fav: false, owned: false },
    },
  });

  const [threads, setThreads] = useState({
    dmc: [],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user) {
      setAuthToken(user.token);
    }

    // Set up user context
    const setUser = async () => {
      try {
        const res = await API.getUser();
        console.log(res);
        setUserState({ ...userState, first: res.data.first });
      } catch (error) {
        localStorage.removeItem("auth");
        console.error(error);
      }
    };

    // Set all universal thread inventories context
    const getThreads = async () => {
      try {
        const res = await API.getAllDMC();
        setThreads({ ...threads, dmc: res.data });
      } catch (error) {
        console.error(error);
      }
    };

    setUser();
    getThreads();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <UserContext.Provider
          value={{ user: userState, setUser: setUserState }}
        >
          <Switch>
            <Route exact path="/" component={Login} />
            <Private exact path="/home" component={Landing} />
            <ThreadContext.Provider
              value={{ threads: threads, setThreads: setThreads }}
            >
              <Private exact path="/inventory" component={Inventory} />
              <Private exact path="/projects" component={Projects} />
              <Private exact path="/wishlist" component={Wishlist} />
              <Private path="/thread" component={Thread} />
              <Private exact path="/entry" component={Entry} />
            </ThreadContext.Provider>
          </Switch>
        </UserContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
