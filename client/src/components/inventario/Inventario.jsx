import React, { useState, Fragment } from "react";
import SideBar from "../layout/SideBar";
import Productos from "./Productos";
import axios from "axios";
import Paginacion from "./Paginacion";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Inventario = ({ isAuthenticated }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [resProducts, setResProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    nameFilter: "",
    categoryFilter: "",
    orderFilter: "",
  });

  useState(async () => {
    setLoading(true);
    const getCategories = async () => {
      const res = await axios.get("/api/categorias");
      setCategories(res.data);
    };
    const getProducts = async () => {
      const res = await axios.get("/api/productos");
      setResProducts(res.data);
      setProducts(res.data);
    };
    getCategories();
    getProducts();
    setLoading(false);
  }, []);

  const changeFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const applyFilters = () => {
    setProducts(() => resProducts);
    setCurrentPage(()=>1);
    if (filters.nameFilter !== "") {
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            product.nombre
              .substring(0, filters.nameFilter.length)
              .toUpperCase() === filters.nameFilter.toUpperCase()
        )
      );
    }
    if (filters.categoryFilter !== "") {
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.categoria === filters.categoryFilter
        )
      );
    }
    if (filters.orderFilter !== "") {
      switch (filters.orderFilter) {
        case "Price1":
          setProducts((prevProducts) =>
            prevProducts.sort((a, b) => (a.precio < b.precio ? -1 : 1))
          );
          break;
        case "Price2":
          setProducts((prevProducts) =>
            prevProducts.sort((a, b) => (a.precio < b.precio ? 1 : -1))
          );
          break;
        default:
          break;
      }
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
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
              name="nameFilter"
              type="text"
              placeholder="Buscar"
              onChange={changeFilters}
            />
          </div>
          <button
            className="search-button btn green-btn br"
            onClick={applyFilters}
          >
            Buscar
          </button>
        </div>
        <div className="search-options">
          <div className="search-filters">
            <select
              name="categoryFilter"
              className="br"
              onChange={changeFilters}
            >
              <option value="" defaultValue>
                Categoría
              </option>
              {categories.map((categoria) => (
                <option key={categoria.id} value={categoria.categoria}>
                  {categoria.categoria}
                </option>
              ))}
            </select>
            <select name="orderFilter" className="br" onChange={changeFilters}>
              <option value="" defaultValue>
                Ordenar por
              </option>
              <option value="Price1">Precio(mayor a menor)</option>
              <option value="Price2">Precio(menor a mayor)</option>
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
              totalProducts={products.length}
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

Inventario.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProprs = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
});

export default connect(mapStateToProprs, {})(Inventario);
