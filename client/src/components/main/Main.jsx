import React, { useEffect } from "react";
import MenuButtons from "./MenuButtons";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {logout} from '../../actions/login';

const Main = ({ isAuthenticated, loading, user,logout }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
  }, []);
  const modulos = [
    { key: 1, nombre: "Inventario", icono: "fas fa-boxes", link: "/inventario" },
    {
      key: 2,
      nombre: "Ventas y cotización",
      icono: "fas fa-shopping-cart",
      link: "/main",
    },
    {
      key: 3,
      nombre: isManager ? "Facturas" : "Tus facturas",
      icono: "fas fa-file-invoice",
      link: "/facturas",
    },
    { key: 4, nombre: "Clientes", icono: "fas fa-users", link: "clientes" },
    isManager
      ? {
          key: 5,
          nombre: "Personal",
          icono: "far fa-address-card",
          link: "/usuarios/crearusuario",
        }
      : null,
    isManager
      ? {
          key: 6,
          nombre: "Proveedores",
          icono: "fas fa-truck-moving",
          link: "/proveedores",
        }
      : null,
  ];
  const signOut = () => {
    logout();
  };
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="main-container">
      <div className="main-user-info">
        <h1>Inventario</h1>
        <p>{user.nombre}</p>
      </div>
      <MenuButtons modulos={modulos} columns={isManager ? 3 : 4} />
      <div className="main-button-container">
        <button className="br btn green-btn" onClick={signOut}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProps, {logout})(Main);
