import React, { useEffect, useState, Fragment } from "react";
import SideBar from "../layout/SideBar";
import generateModules from "../../utils/sidebarModules";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import { createClient } from "../../actions/inserts";

const CrearCliente = ({ createClient, isAuthenticated, loading, user }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
  }, []);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    balance: 0,
    rtn: "",
  });
  const [attempting, setAttempting] = useState(false);

  const crearCliente = async (e) => {
    e.preventDefault();
    setAttempting(true);
    await createClient(formData, setFormData);
    setAttempting(false);
  };

  const typeData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { nombre, balance, email, rtn } = formData;
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar modulos={generateModules(isManager, 4)} />
      <form className="form-box">
        <h1 className="fw-300">Agregar cliente</h1>
        {!attempting ? (
          <Fragment>
            <input
              autoComplete="off"
              onChange={typeData}
              className="br"
              type="text"
              placeholder="Nombre"
              value={nombre}
              name="nombre"
            />
            <input
              autoComplete="off"
              onChange={typeData}
              className="br"
              type="text"
              placeholder="Email"
              value={email}
              name="email"
            />
            <input
              className="br"
              type="number"
              step="0.1"
              min="0"
              placeholder="Saldo inicial"
              onChange={typeData}
              value={balance}
              name="balance"
            />
            <input
              autoComplete="off"
              name="rtn"
              className="br"
              type="text"
              placeholder="RTN"
              onChange={typeData}
              value={rtn}
            />
            <div className="form-btns">
              <button className="btn green-btn br" onClick={crearCliente}>
                Guardar
              </button>
              <Link to="/clientes" className="btn blue-btn br">
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

CrearCliente.propTypes = {
  createClient: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProprs = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProprs, { createClient })(CrearCliente);
