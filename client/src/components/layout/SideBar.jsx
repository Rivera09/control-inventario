import React from "react";

const SideBar = () => (
  <div className="side-bar">
    <div className="user-info">
      <h3 className="nombre-tienda">control-inventario</h3>
      <h3 className="nombre-empleado">Donaldo Rivera</h3>
    </div>
    <div className="side-bar-buttons">
      {/* <a className="side-bar-button btn blue-btn" href="#">
        Botón
      </a>
      <a className="side-bar-button btn blue-btn" href="#">
        Botón
      </a>
      <a className="side-bar-button btn blue-btn" href="#">
        Botón
      </a>
      <a className="side-bar-button btn blue-btn" href="#">
        Botón
      </a>
      <a className="side-bar-button btn blue-btn" href="#">
        Botón
      </a>
      <a className="side-bar-button btn blue-btn" href="#">
        Botón
      </a> */}
    </div>
    <p className="date-holder">{new Date().toLocaleString('es-mx', {  weekday: 'short',day:'2-digit',month:'2-digit',year:'numeric' })}</p>
  </div>
);

export default SideBar;
