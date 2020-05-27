import axios from "axios";
import { PROVIDER_CREATED, PROVIDER_CREATION_FAILED } from "./types";
import { setAlert } from "./alert";

export const createProvider = (providerData, setFormData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
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
