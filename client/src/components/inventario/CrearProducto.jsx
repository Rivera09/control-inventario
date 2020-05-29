import React, { useState, Fragment, useEffect } from "react";
import SideBar from "../layout/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createProdcut } from "../../actions/inserts";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import generateModules from "../../utils/sidebarModules";
import axios from "axios";

const CrearProducto = ({ createProdcut, isAuthenticated, loading, user }) => {
  const isManager = user !== null && user.tipo === "Vendedor" ? false : true;
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token"))
      setAuthToken(localStorage.getItem("token"));
    const getCategories = async () => {
      const res = await axios.get("/api/categorias");
      setCategories(res.data);
    };
    const getProviders = async () => {
      const res = await axios.get("/api/proveedores");
      setProviders(res.data);
    };
    getProviders();
    getCategories();
  }, []);
  const [formData, setFormData] = useState({
    nombre: "",
    cantidad: 0,
    idCategoria: 0,
    idProveedor: 0,
    descripcion: "",
    precioCompra: 0,
    precioVenta: 0,
  });

  const [attempting, setAttempting] = useState(false);
  const crearProducto = async (e) => {
    e.preventDefault();
    setAttempting(true);
    await createProdcut(formData, setFormData);
    setAttempting(false);
  };

  const typeData = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const {
    nombre,
    idCategoria,
    idProveedor,
    descripcion,
    precioCompra,
    precioVenta,
    cantidad,
  } = formData;
  if (!isAuthenticated && isAuthenticated !== null) return <Redirect to="/" />;
  if (user !== null && user.tipo === "Vendedor") return <Redirect to="/main" />;
  return loading || user === null ? (
    <div className="loading-image page-loading"></div>
  ) : (
    <div className="side-bar-page">
      <SideBar nombre={user.nombre} modulos={generateModules(isManager, 6)} />
      <form className="form-box flex-box-container">
        <h1 className="fw-300">Agregar producto</h1>
        {!attempting ? (
          <Fragment>
            <div className="flex-form">
              <div className="product-main-data">
                <input
                  type="text"
                  name="nombre"
                  className="br"
                  placeholder="Nombre"
                  onChange={typeData}
                  autoComplete="off"
                  value={nombre}
                />
                <div className="numeric-input-container">
                  <label>Cantidad inicial</label>
                  <input
                    value={cantidad}
                    type="number"
                    className="br"
                    placeholder="cantidad inicial"
                    name="cantidad"
                    onChange={typeData}
                    autoComplete="off"
                  />
                </div>
                <select
                  name="idCategoria"
                  className="br"
                  onChange={typeData}
                  value={idCategoria}
                >
                  <option value="" defaultValue>
                    Categoría
                  </option>
                  {categories.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.categoria}
                    </option>
                  ))}
                </select>
                <select
                  name="idProveedor"
                  className="br"
                  onChange={typeData}
                  value={idProveedor}
                >
                  <option value="" defaultValue>
                    Proveedor
                  </option>
                  {providers.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="description-data">
                <textarea
                  className="text-area br"
                  value={descripcion}
                  onChange={typeData}
                  name="descripcion"
                  placeholder="Descripción del prodcuto"
                ></textarea>
                <div className="numeric-input-container">
                  <label>Precio compra</label>
                  <input
                    value={precioCompra}
                    type="number"
                    className="br"
                    placeholder="Precio compra"
                    name="precioCompra"
                    onChange={typeData}
                    autoComplete="off"
                    min="0"
                  />
                </div>
                <div className="numeric-input-container">
                  <label>Precio venta</label>
                  <input
                    value={precioVenta}
                    type="number"
                    className="br"
                    placeholder="Precio venta"
                    name="precioVenta"
                    onChange={typeData}
                    autoComplete="off"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="form-btns">
              <button className="br btn green-btn" onClick={crearProducto}>
                Guardar
              </button>
              <Link to="/inventario" className="br btn blue-btn">
                Cancelar
              </Link>
            </div>
          </Fragment>
        ) : (
          <div className="loading-image provider-loading"></div>
        )}
      </form>
    </div>
  );
};

CrearProducto.propTypes = {
  createProdcut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  user: state.login.user,
});

export default connect(mapStateToProps, { createProdcut })(CrearProducto);
