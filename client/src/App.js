import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./App.css";
import "./sass/App.scss";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/login/Login";
import Inventario from "./components/inventario/Inventario";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/inventario" component={Inventario} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
