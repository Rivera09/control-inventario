import React from "react";
import SideBar from "../layout/SideBar";
import CajaProducto from './CajaProducto';

const Inventario = () => {
  return (
    <div className="inventario-container">
      <SideBar nombre={"Jorge Rivera"}
      modulos={["productos","ventas","facturas","personal","reportes","clientes"]}/>
      <main className="inventario-main">
        <h1>Inventario</h1>
        <div className="search-container">
          <div className="search-input">
            <i class="fas fa-search"></i>
            <input type="text" placeholder='Buscar'/>
          </div>
          <button className="search-button btn green-btn">Buscar</button>
        </div>
        <div className="search-options">
          <div className="search-filters">
            <select name="Categoría" id="">
              <option value="" selected>
                Categoría
              </option>
              <option value="comestibles">Comestibles</option>
              <option value="Limpieza">Limpieza</option>
            </select>
            <select name="Orden">
              <option value="" selected>
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
          id={1}
          nombre={"Sopa"}
          categoria={"Alimentos"}
          cantidad={20}
          precio={10}
          />
          <CajaProducto
          id={1}
          nombre={"Sopa"}
          categoria={"Alimentos"}
          cantidad={20}
          precio={10}
          />
          <CajaProducto
          id={1}
          nombre={"Sopa"}
          categoria={"Alimentos"}
          cantidad={20}
          precio={10}
          />
          <CajaProducto
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
