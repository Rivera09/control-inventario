const express = require("express");
const { ObtenerCategorias } = require("../controllers/Categorias");

const router = express.Router();

router.route("/").get(ObtenerCategorias);

module.exports = router;