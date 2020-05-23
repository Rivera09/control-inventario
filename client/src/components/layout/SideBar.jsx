import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ nombre, modulos }) => (
  <div className="side-bar">
    <div className="user-info">
      <h3 className="nombre-tienda">control-inventario</h3>
      <h3 className="nombre-empleado">{nombre}</h3>
    </div>
    <div className="side-bar-buttons">
      {modulos.map((modulo) => (
        <Link
          key={modulo.key}
          to={`/${modulo.link}`}
          className="side-bar-button btn blue-btn"
        >
          {modulo.nombre}
        </Link>
      ))}
    </div>
    <p className="date-holder">
      {new Date().toLocaleString("es-mx", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}
    </p>
  </div>
);

export default SideBar;
