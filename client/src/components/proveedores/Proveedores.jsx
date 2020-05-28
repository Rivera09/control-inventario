import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import generateModules from "../../utils/sidebarModules";
import TablaClientes from "./TablaProveedores";
import axios from "axios";
import Paginacion from "../layout/Paginacion";
import { connect } from "react-redux";
import { Redirect,Link } from "react-router-dom";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";

const Proveedores = ({ isAuthenticated, loading, user }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  const [resProviders, setResProviders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [providersPerPage] = useState(8);

  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
    const getProviders = async () => {
      const res = await axios.get("/api/proveedores");
      setResProviders(res.data);
      setProviders(res.data);
    };
    getProviders();
  }, []);
  const typeName = (e) => {
    setNameFilter(e.target.value);
  };
  const searchClients = () => {
    setProviders(() => resProviders);
    setCurrentPage(1);
    if (nameFilter !== "") {
      setProviders((prevProviders) =>
        prevProviders.filter(
          (client) =>
            client.nombre.substring(0, nameFilter.length).toUpperCase() ===
            nameFilter.toUpperCase()
        )
      );
    }
  };
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = providers.slice(indexOfFirstProvider, indexOfLastProvider);

  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar nombre={user.nombre} modulos={generateModules(isManager,4)} />
      <main className="inventario-main">
        <h1>Proveedores</h1>
        <div className="search-container">
          <div className="search-input br">
            <i className="fas fa-search"></i>
            <input
              name="nameFilter"
              type="text"
              placeholder="Buscar"
              onChange={typeName}
            />
          </div>
          <button
            className="search-button btn green-btn br"
            onClick={searchClients}
          >
            Buscar
          </button>
        </div>
        <div className="search-options">
          <div className="products-options">
            {isManager ? (
              <Link to='/proveedores/crearproveedor' className="btn blue-btn br">Agregar proveedor</Link>
            ) : null}
          </div>
        </div>
        <TablaClientes proveedores={currentProviders} />
        <Paginacion
          amountPerPage={providersPerPage}
          total={providers.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
};

Proveedores.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProprs = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProprs, {})(Proveedores);
