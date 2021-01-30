import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components

// Pages
import Thread from "./pages/Thread";


function App() {
  return (
    <Router>
      <Switch>
        <Thread />
      </Switch>
    </Router>
  );
}

export default App;
