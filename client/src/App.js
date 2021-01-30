import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components

// Pages
import Landing from "./pages/Landing";
import Thread from "./pages/Thread";


function App() {
  return (
    <Router>
      <Switch>
        <Landing />
      </Switch>
    </Router>
  );
}

export default App;
