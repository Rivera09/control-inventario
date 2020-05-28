import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import generateModules from "../../utils/sidebarModules";
import TablaClientes from "./TablaClientes";
import axios from "axios";
import Paginacion from "../layout/Paginacion";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import {Link} from 'react-router-dom';

const Clientes = ({ isAuthenticated, loading, user }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  const [resClients, setResClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(8);

  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
    const getClients = async () => {
      const res = await axios.get("/api/clientes");
      setResClients(res.data);
      setClients(res.data);
    };
    getClients();
  }, []);
  const typeName = (e) => {
    setNameFilter(e.target.value);
  };
  const searchClients = () => {
    setClients(() => resClients);
    setCurrentPage(1);
    if (nameFilter !== "") {
      setClients((prevClients) =>
        prevClients.filter(
          (client) =>
            client.nombre.substring(0, nameFilter.length).toUpperCase() ===
            nameFilter.toUpperCase()
        )
      );
    }
  };
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClient = clients.slice(indexOfFirstClient, indexOfLastClient);

  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar nombre={user.nombre} modulos={generateModules(isManager, 4)} />
      <main className="inventario-main">
        <h1>Clientes</h1>
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
            <Link className="btn blue-btn br" to='/clientes/crearcliente'>Agregar cliente</Link>
          </div>
        </div>
        <TablaClientes clientes={currentClient} />
        <Paginacion
          amountPerPage={clientsPerPage}
          total={clients.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
};

Clientes.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProprs = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProprs, {})(Clientes);
