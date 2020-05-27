import React from "react";
import { Link } from "react-router-dom";

const MenuButton = ({ modulos, columns }) => {
  return (
    <div className={`main-grid-container grid-container-${columns}`}>
      {modulos.map((modulo) =>
        modulo !== null ? (
          <div key={modulo.key} className="button-container">
            <Link className="br" to={modulo.link}>
              <i className={modulo.icono}></i>
            </Link>
            <p>{modulo.nombre}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default MenuButton;
