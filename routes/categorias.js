const express = require("express");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const acceso = require("../middleware/acceso");
const {
  obtenerCategorias,
  crearCategoria,
} = require("../controllers/categorias");

const router = express.Router();

router
  .route("/")
  .get(obtenerCategorias);
router
  .route("/")
  .post(
    [check("descripcion").exists(), check("idIsv").isInt()],
    auth,
    acceso("Administrador", "Gerente general"),
    crearCategoria
  );

module.exports = router;
