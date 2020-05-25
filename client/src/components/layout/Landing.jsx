import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <main className="landing-container">
        <h1>INVENTARIO</h1>
        <p className="fw-300">Controla todo en un mismo lugar.</p>
        <Link className="fw-300 br btn blue-btn" to="/login">
          Login
        </Link>
      </main>
    </div>
  );
};

export default Landing;
