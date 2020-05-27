import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./App.css";
import "./sass/App.scss";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/login/Login";
import Inventario from "./components/inventario/Inventario";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/login";
import setAuthToken from "./utils/setAuthToken";
import CrearProveedor from './components/proveedores/CrearProveedor';
import crearUsuario from './components/usuarios/CrearUsuario';

if (localStorage.getItem("token")) setAuthToken(localStorage.getItem("token"));

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/inventario" component={Inventario} />
            <Route exact path='/proveedores/crearproveedor' component={CrearProveedor}/>
            <Route exact path='/usuarios/crearusuario' component={crearUsuario}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
