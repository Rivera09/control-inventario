import React, { useState, Fragment, useEffect } from "react";
import SideBar from "../layout/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createProvider } from "../../actions/inserts";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import generateModules from "../../utils/sidebarModules";

const CrearProveedor = ({ createProvider, isAuthenticated, loading, user }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
  }, []);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const [attempting, setAttempting] = useState(false);
  const crearPoveedor = async (e) => {
    e.preventDefault();
    setAttempting(true);
    await createProvider({ nombre, email, telefono }, setFormData);
    setAttempting(false);
  };

  const typeData = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { nombre, email, telefono } = formData;
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  if (user !== null && user.tipo === "Vendedor") return <Redirect to="/main" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar nombre={user.nombre} modulos={generateModules(isManager, 6)} />
      <form className="form-box">
        <h1 className="fw-300">Agregar proveedor</h1>
        {!attempting ? (
          <Fragment>
            <input
              type="text"
              name="nombre"
              className="br"
              placeholder="Nombre"
              onChange={typeData}
              autoComplete="off"
              value={nombre}
            />
            <input
              value={email}
              type="email"
              className="br"
              placeholder="Correo electrónico"
              name="email"
              onChange={typeData}
              autoComplete="off"
            />
            <input
              type="tel"
              name="telefono"
              className="br"
              placeholder="Teléfono"
              autoComplete="off"
              onChange={typeData}
              value={telefono}
            />
            <div className="form-btns">
              <button className="br btn green-btn" onClick={crearPoveedor}>
                Guardar
              </button>
              <Link to="/proveedores" className="br btn blue-btn">
                Cancelar
              </Link>
            </div>
          </Fragment>
        ) : (
          <div className="loading-image provider-loading"></div>
        )}
      </form>
    </div>
  );
};

CrearProveedor.propTypes = {
  createProvider: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProps, { createProvider })(CrearProveedor);
