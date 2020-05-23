import React from "react";
import SideBar from "../layout/SideBar";
import CajaProducto from "./CajaProducto";

const Inventario = () => {
  return (
    <div className="inventario-container">
      <SideBar
        nombre={"Jorge Rivera"}
        modulos={[
          { key: 1, nombre: "productos", link: "inventario" },
          { key: 2, nombre: "ventas", link: "ventas" },
          { key: 3, nombre: "facturas", link: "facturas" },
          { key: 4, nombre: "personal", link: "usuarios" },
          { key: 5, nombre: "reportes", link: "reportes" },
          { key: 6, nombre: "clientes", link: "clientes" },
        ]}
      />
      <main className="inventario-main">
        <h1>Inventario</h1>
        <div className="search-container">
          <div className="search-input">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Buscar" />
          </div>
          <button className="search-button btn green-btn">Buscar</button>
        </div>
        <div className="search-options">
          <div className="search-filters">
            <select name="Categoría" id="">
              <option value="" defaultValue>
                Categoría
              </option>
              <option value="comestibles">Comestibles</option>
              <option value="Limpieza">Limpieza</option>
            </select>
            <select name="Orden">
              <option value="" defaultValue>
                Ordenar por
              </option>
              <option value="Nombre">Nombre</option>
              <option value="Categoría">Categoría</option>
            </select>
          </div>
          <div className="products-options">
            <button className="btn blue-btn">Agregar producto</button>
            <button className="btn blue-btn">Agregar existente</button>
          </div>
        </div>
        <div className="grid-container">
          <CajaProducto
            key={1}
            id={1}
            nombre={"Sopa"}
            categoria={"Alimentos"}
            cantidad={20}
            precio={10}
          />
        </div>
      </main>
    </div>
  );
};

export default Inventario;
