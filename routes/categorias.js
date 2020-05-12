const express = require("express");
const { obtenerCategorias } = require("../controllers/Categorias");

const router = express.Router();

router.route("/").get(obtenerCategorias);

module.exports = router;