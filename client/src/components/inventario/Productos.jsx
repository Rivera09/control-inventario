import React, { useState } from "react";
import CajaProducto from "./CajaProducto";

const Productos = ({ productos }) => {
  return (
    <div className="grid-container">
      {productos.map((producto) => (
        <CajaProducto
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          categoria={producto.categoria}
          precio={producto.precio}
          cantidad={producto.cantidad}
        />
      ))}
    </div>
  );
};

export default Productos;
