import React from "react";
import SideBar from "../layout/SideBar";

const Inventario = () => {
  return (
    <div className="inventario-container">
      <SideBar />
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
              <option value="" disabled selected>
                Categoría
              </option>
              <option value="comestibles">Comestibles</option>
              <option value="Limpieza">Limpieza</option>
            </select>
            <select name="Orden">
              <option value="" disabled selected>
                Ordenar por
              </option>
              <option value="Nombre">Nombre</option>
              <option value="Categoría">Categoría</option>
            </select>
          </div>
          <div className="products-options">
            <button>Agregar producto</button>
            <button>Agregar existente</button>
          </div>
        </div>
        <div className="grid-container">
          <div className="product-example"></div>
          <div className="product-example"></div>
          <div className="product-example"></div>
          <div className="product-example"></div>
          <div className="product-example"></div>
        </div>
      </main>
    </div>
  );
};

export default Inventario;
