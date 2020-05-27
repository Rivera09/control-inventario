import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/login";
import PropTypes from "prop-types";
import {Redirect} from 'react-router-dom'
const Login = ({ login,isAuthenticated }) => {
  const [attempting, setAttempting] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    contrasena: "",
  });

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const attempLogin = async () => {
    setAttempting(true);
    await login({ email, contrasena });
    setAttempting(false);
  };

  if(isAuthenticated){
    if(attempting) setAttempting(false);
    return (
      <Redirect to="/main"/>
    )
  }

  const { email, contrasena } = loginData;
  return (
    <div className="login-container">
      <form
        className="login-box"
        onSubmit={(e) => {
          e.preventDefault();
          attempLogin();
        }}
      >
        <h1 className="fw-400">Login</h1>
        <i className="fas fa-user user-icon"></i>
        {!attempting ? (
          <Fragment>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              value={email}
              required
              className="br"
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              onChange={onChange}
              value={contrasena}
              required
              className="br"
            />
            <button type="submit" className="btn blue-btn br">
              Login
            </button>
          </Fragment>
        ) : (
          <div className="loading-image login-loading"></div>
        )}
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated:state.login.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login);
