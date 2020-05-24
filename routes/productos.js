const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const acceso = require("../middleware/acceso");

const {
  crearProducto,
  obtenerProductoPorId,
  obtenerProductos
} = require("../controllers/productos");

router.route('/').get(obtenerProductos);

router
  .route("/")
  .post(
    [
      check("nombre").exists(),
      check("cantidad").exists(),
      check("idCategoria").exists(),
      check("idProveedor").exists(),
      check("descripcion").exists(),
      check("precioCompra").exists(),
      check("precioVenta").exists(),
    ],
    auth,
    acceso("Administrador", "Gerente general"),
    crearProducto
  );

router.route("/:id").get(auth, obtenerProductoPorId);

module.exports = router;
