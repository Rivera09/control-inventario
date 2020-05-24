import React, { useState, Fragment } from "react";
import SideBar from "../layout/SideBar";
import Productos from "./Productos";
import axios from "axios";
import Paginacion from "./Paginacion";

const Inventario = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [productsPerPage] = useState(12);
  const [searchValue, setSearchValue] = useState("");

  useState(() => {
    const obtenerProductos = async () => {
      const res = await axios.get("/api/productos");
      setProductos(res.data);
    };
    obtenerProductos();
    setLoading(false);
  }, []);

  const typeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const searchProducts = () => {
    if (searchValue.length === 0) return;
    const prueba = productos.filter(
      (producto) =>
        producto.nombre.substring(0, searchValue.length).toUpperCase() ===
        searchValue.toUpperCase()
    );
    setProductos(prueba);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="side-bar-page">
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
            <input
              type="text"
              placeholder="Buscar"
              value={searchValue}
              onChange={typeSearch}
            />
          </div>
          <button
            className="search-button btn green-btn"
            onClick={searchProducts}
          >
            Buscar
          </button>
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
        {!loading ? (
          <Fragment>
            <div className="products-container">
              <Productos productos={currentProducts} />
            </div>
            <Paginacion
              productsPerPage={productsPerPage}
              totalProducts={productos.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </Fragment>
        ) : (
          <div className="loading-image products-loading"></div>
        )}
      </main>
    </div>
  );
};

export default Inventario;
