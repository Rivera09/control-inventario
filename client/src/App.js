import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Login from './components/login/Login';
import Inventario from './components/inventario/Inventario';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Inventario} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
