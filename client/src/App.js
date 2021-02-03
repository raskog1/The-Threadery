import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

// Utilities and createContext
import setAuthToken from "./utils/setAuthToken";
import UserContext from "./utils/UserContext";
import AuthContext from "./utils/AuthContext";
import './App.css';

// Pages
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
    last: "",
    email: "",
    favorites: [],
    owned: [],
    wishlist: []
  });

  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    role: null,
  });

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      setAuthState({
        isAuthenticated: false,
        loading: false,
        role: null,
      });
    }

    try {
      axios.get("/api/auth").then((res) => {
        setUserState(res.data);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
        <AuthContext.Provider value={{ authData: authState, setAuth: setAuthState }}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Landing} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route path="/thread" component={Thread} />
            <Route exact path="/entry" component={Entry} />
          </Switch>
        </AuthContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
