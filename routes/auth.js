const express = require("express");
const {
  iniciarSesion,
  obtenerUsuarioPorToken,
} = require("../controllers/auth");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").post(iniciarSesion);
router.route("/").get(auth, obtenerUsuarioPorToken);

module.exports = router;
