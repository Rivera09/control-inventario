import React from "react";
import producto from "../../img/producto.jpg";
import { Link } from "react-router-dom";

const CajaProducto = ({ id, nombre, categoria, cantidad, precio }) => {
  return (
    <div className="product-box">
      <Link to={`productos/${id}`}>
        <img className="img-product" alt="imagen de ejemplo" src={producto} />
        <p>{nombre}</p>
        <p>{categoria}</p>
        <p>disponibles: {cantidad}</p>
        <p>precio: lps.{precio}</p>
      </Link>
    </div>
  );
};

export default CajaProducto;
