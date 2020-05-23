import axios from "axios";
import { setAlert } from "./alert";
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token"))
    setAuthToken(localStorage.getItem("token"));

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

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

    dispatch(loadUser());
  } catch (e) {
    if (e.response && e.response.data.errores) {
      const errors = e.response.data.errores;
      errors.forEach((error) => dispatch(setAlert(error.mensaje, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
