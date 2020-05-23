import axios from "axios";
import { setAlert } from "./alert";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const login = ({ email, contrasena }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, contrasena });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    const errors = e.response.data.errores;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.mensaje, "danger")));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
