import axios from "axios";
import {
  PROVIDER_CREATED,
  PROVIDER_CREATION_FAILED,
  USER_CREATED,
  USER_CREATION_FAILED,
  CLIENT_CREATED,
  CLIENT_CREATION_FAILED,
  PRODUCT_CREATED,
  PRODUCT_CREATION_FAILED
} from "./types";
import { setAlert } from "./alert";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createProdcut = (productData,setFormData) => async dispatch => {
  const body = JSON.stringify(productData);
  try {
    const res = await axios.post('/api/productos',body,config);
    dispatch({
      type:PRODUCT_CREATED
    });
    dispatch(setAlert(res.data.msg,'ok'));
    setFormData({
      nombre: "",
      cantidad: 0,
      idCategoria: 0,
      idProveedor: 0,
      descripcion: "",
      precioCompra: 0,
      precioVenta: 0,
    });
  } catch (e) {
    if (e.response && e.response.data.errores) {
      const errors = e.response.data.errores;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PRODUCT_CREATION_FAILED
    });
  }
}

export const createClient = (clientData,setFormData) =>async dispatch => {
  const body = JSON.stringify(clientData);
  try {
    const res = await axios.post('/api/clientes',body,config);
    dispatch({
      type:CLIENT_CREATED
    });
    dispatch(setAlert(res.data.msg,'ok'));
    setFormData({
      nombre: "",
      telefono: "",
      balance: 0,
      rtn: "",
    });
  } catch (e) {
    if (e.response && e.response.data.errores) {
      const errors = e.response.data.errores;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CLIENT_CREATION_FAILED
    });
  }
}

export const createUser = (userData, setFormData) => async (dispatch) => {
  
  const body = JSON.stringify(userData);
  try {
    const res = await axios.post("/api/usuarios", body, config);
    dispatch({
      type: USER_CREATED,
    });
    dispatch(setAlert(res.data.msg, "ok"));
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      contrasena: "",
      idTipoUsuario: 0,
      identidad: "",
    });
  } catch (e) {
    if (e.response && e.response.data.errores) {
      const errors = e.response.data.errores;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: USER_CREATION_FAILED
    });
  }
};

export const createProvider = (providerData, setFormData) => async (
  dispatch
) => {
  const body = JSON.stringify(providerData);
  try {
    const res = await axios.post("/api/proveedores", body, config);
    dispatch({
      type: PROVIDER_CREATED,
    });
    dispatch(setAlert(res.data.msg, "ok"));
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
    });
  } catch (e) {
    if (e.response && e.response.data.errores) {
      const errors = e.response.data.errores;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROVIDER_CREATION_FAILED,
    });
  }
};
