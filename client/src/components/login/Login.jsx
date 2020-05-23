import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/login";
import PropTypes from "prop-types";

const Login = ({ login }) => {
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
    login({ email, contrasena });
  };

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
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
          value={email}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={onChange}
          value={contrasena}
          required
        />
        <button type="submit" className="btn blue-btn">
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { setAlert, login })(Login);
