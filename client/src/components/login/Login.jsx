import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const logIn=async (e)=>{
      e.preventDefault();
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({email,password});
    try {
        const res = await axios.post('/api/auth',body,config);
        console.log(res.data);
    } catch (e) {
        const errors = e.response.data.errors;
        console.log(errors);
    }
  }

  const { email, password } = loginData;
  return (
    <div className="login-container">
      <form className="login-box">
        <h1 className="fw-400">Login</h1>
        <i className="fas fa-user user-icon"></i>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={onChange}
          value={password}
        />
        <button type="submit" onSubmit={logIn}>Login</button>
      </form>
    </div>
  );
};

export default Login;
