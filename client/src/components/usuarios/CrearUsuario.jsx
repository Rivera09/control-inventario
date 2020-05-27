import React, { useState, Fragment, useEffect } from "react";
import SideBar from "../layout/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import generateModules from "../../utils/sidebarModules";
import axios from "axios";
import {createUser} from '../../actions/inserts';

const CrearUsuario = ({ isAuthenticated, loading, user,createUser }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  const [userTypes, setUserTypes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
    const getUserTypes = async () => {
      const res = await axios.get("/api/tiposusuario");
      setUserTypes(res.data);
    };
    getUserTypes();
  }, []);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    contrasena: "",
    idTipoUsuario: 0,
    identidad: "",
  });

  const [attempting, setAttempting] = useState(false);
  const crearUsuario = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setAttempting(true);
    await createUser(formData,setFormData);
    setAttempting(false);
  };

  const typeData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const {
    nombre,
    email,
    telefono,
    contrasena,
    idTipoUsuario,
    identidad,
  } = formData;
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  if (user !== null && user.tipo === "Vendedor") return <Redirect to="/main" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar nombre={user.nombre} modulos={generateModules(isManager, 6)} />
      <form className="form-box">
        <h1 className="fw-300">Agregar usuario</h1>
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
            <select
              name="idTipoUsuario"
              className="br"
              onChange={typeData}
              value={idTipoUsuario}
            >
              <option value="" defaultValue>
                Tipo de empleado
              </option>
              {userTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.descripcion}
                </option>
              ))}
            </select>
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
            <input
              type="password"
              name="contrasena"
              className="br"
              placeholder="Contraseña"
              autoComplete="off"
              onChange={typeData}
              value={contrasena}
            />
            <input
              type="text"
              name="identidad"
              className="br"
              placeholder="No.Identidad"
              autoComplete="off"
              onChange={typeData}
              value={identidad}
            />
            <div className="form-btns">
              <button className="br btn green-btn" onClick={crearUsuario}>
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
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProps, {createUser})(CrearUsuario);
