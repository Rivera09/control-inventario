import React from 'react'

const Login = () => {
    return (
        <div className="login-container">
            <form className="box">
                <h1 className="fw-400">Login</h1>
                <i className="fas fa-user user-icon"></i>
                <input type="email" name="" placeholder="Email"/>
                <input type="password" name="" placeholder="Contraseña"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;