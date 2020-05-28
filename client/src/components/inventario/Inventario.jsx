import React, { useState, Fragment } from "react";
import SideBar from "../layout/SideBar";
import Productos from "./Productos";
import axios from "axios";
import Paginacion from "../layout/Paginacion";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import generateModules from "../../utils/sidebarModules";

const Inventario = ({ isAuthenticated, loading, user }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [resProducts, setResProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    nameFilter: "",
    categoryFilter: "",
  });
  useState(async () => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
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
  }, []);

  const changeFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const applyFilters = () => {
    setProducts(() => resProducts);
    setCurrentPage(() => 1);
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
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar nombre={user.nombre} modulos={generateModules(isManager, 1)} />
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
          </div>
          <div className="products-options">
            {isManager ? (
              <Fragment>
                <button className="btn blue-btn br">Agregar producto</button>
              </Fragment>
            ) : null}
          </div>
        </div>
        <Productos productos={currentProducts} />
        <Paginacion
          amountPerPage={productsPerPage}
          total={products.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
};

Inventario.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProprs = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProprs, {})(Inventario);
