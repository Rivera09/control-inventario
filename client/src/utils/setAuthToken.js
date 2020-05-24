import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["usuario-token"] = token;
  } else {
    delete axios.defaults.headers.common["usuario-token"];
  }
};

export default setAuthToken;
