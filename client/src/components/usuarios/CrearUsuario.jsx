import React, { useState, Fragment, useEffect } from "react";
import SideBar from "../layout/SideBar";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createProvider } from "../../actions/providers";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";

const CrearUsuario = ({ createProvider, isAuthenticated, loading, user }) => {
  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
  }, []);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    contrasena:"",
  });

  const [attempting, setAttempting] = useState(false);
  const CrearUsuario = async (e) => {
    e.preventDefault();
    setAttempting(true);
    await createProvider({ nombre, email, telefono, contrasena }, setFormData);
    setAttempting(false);
  };

  const typeData = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { nombre, email, telefono, contrasena } = formData;
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar
        nombre={user.nombre}
        modulos={[
          { key: 1, nombre: "productos", link: "inventario" },
          { key: 2, nombre: "ventas", link: "ventas" },
          { key: 3, nombre: "facturas", link: "facturas" },
          { key: 4, nombre: "personal", link: "usuarios" },
          { key: 5, nombre: "reportes", link: "reportes" },
          { key: 6, nombre: "clientes", link: "clientes" },
        ]}
      />

      <div className="search-options">
        <div className="search-filters">
          <select name="orderFilter" className="br" >
            <option value="" defaultValue>
            Seleccionar tipo
              </option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
          </select>       
        </div>
      </div>

      <form className="agregar-usuario">
        <h1 className="fw-300">Agregar usuario</h1>
        {!attempting ? (
          <Fragment>
            <input
              type="text"
              name="nombre"
              className="input br"
              placeholder="Nombre"
              onChange={typeData}
              autoComplete="off"
              value={nombre}
            />
            <input
              value={email}
              type="email"
              className="input br"
              placeholder="Correo electrónico"
              name="email"
              onChange={typeData}
              autoComplete="off"
            />
            <input
              type="tel"
              name="telefono"
              className="input br"
              placeholder="Teléfono"
              autoComplete="off"
              onChange={typeData}
              value={telefono}
            />
            <input
              type="password"
              name="contrasena"
              className="input br"
              placeholder="Contraseña"
              autoComplete="off"
              onChange={typeData}
              value={contrasena}
            />
            <div className="form-btns">
              <button className="br btn green-btn" onClick={CrearUsuario}>
                Guardar
              </button>
              <Link to="/" className="br btn blue-btn">
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

CrearUsuario.propTypes = {
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

export default connect(mapStateToProps, { createProvider })(CrearUsuario);