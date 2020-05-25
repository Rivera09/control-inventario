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
  const [categorias,setCategorias] = useState([]);

  useState(() => {
    setLoading(true);
    const obtenerProductos = async () => {
      const res = await axios.get("/api/productos");
      setProductos(res.data);
    };
    const obtenerCategorias = async () => {
      const res = await axios.get("/api/categorias");
      setCategorias(res.data);
    }
    obtenerProductos();
    obtenerCategorias();
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
          <div className="search-input br">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar"
              value={searchValue}
              onChange={typeSearch}
            />
          </div>
          <button
            className="search-button btn green-btn br"
            onClick={searchProducts}
          >
            Buscar
          </button>
        </div>
        <div className="search-options">
          <div className="search-filters">
            <select name="Categoría" className="br">
              <option value="" defaultValue>
                Categoría
              </option>
              {categorias.map(categoria=>(
                <option key={categoria.id} value={categoria.categoria}>{categoria.categoria}</option>
              ))}
            </select>
            <select name="Orden" className="br">
              <option value="" defaultValue>
                Ordenar por
              </option>
              <option value="Nombre">Nombre</option>
              <option value="Categoría">Categoría</option>
            </select>
          </div>
          <div className="products-options">
            <button className="btn blue-btn br">Agregar producto</button>
            <button className="btn blue-btn br">Agregar existente</button>
          </div>
        </div>
        {!loading ? (
          <Fragment>
            <Productos productos={currentProducts} />
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
