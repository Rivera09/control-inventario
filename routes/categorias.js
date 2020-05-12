const express = require("express");

const auth = require('../middleware/auth');
const acceso = require('../middleware/acceso');
const { obtenerCategorias } = require("../controllers/categorias");

const router = express.Router();

router.route("/").get(auth, acceso("Administrador","Gerente general"), obtenerCategorias);

module.exports = router;