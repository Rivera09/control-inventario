const express = require("express");
const { obtenerTiposUsuario } = require("../controllers/tipoUsuarios");
const auth = require('../middleware/auth');
const acceso = require('../middleware/acceso');

const router = express.Router();

router.route("/").get(auth,acceso("Administrador","Gerente general"),obtenerTiposUsuario);

module.exports = router;
