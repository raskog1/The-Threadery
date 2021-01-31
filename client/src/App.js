import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components

// Pages
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Thread from "./pages/Thread";
import Inventory from "./pages/Inventory";
import Projects from "./pages/Projects";
import Wishlist from "./pages/Wishlist";



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Landing} />
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/wishlist" component={Wishlist} />
        <Route exact path="/thread" component={Thread} />
      </Switch>
    </Router>
  );
}

export default App;
