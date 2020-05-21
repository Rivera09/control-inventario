import React from "react";
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <main className="landing-container">
        <h1 className="landing-element">INVENTARIO</h1>
        <p className="landing-element fw-300">Controla todo en un mismo lugar.</p>
        <Link className="landing-element landing-btn fw-300" to='/login'>Login</Link>
      </main>
    </div>
  );
};


export default Landing;