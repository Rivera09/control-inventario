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

router.route('/').get(auth,obtenerProductos);

router
  .route('/')
  .post(
    [
      check("nombre","Ingrese un nombre válido.").exists(),
      check("cantidad","Ingrese una cantidad válida.").exists(),
      check("idCategoria","Ingrese una categoría válida.").isNumeric(),
      check("idProveedor","Ingrese un proveedore válido.").exists().isNumeric(),
      check("precioCompra","Ingrese un precio compra válido.").isFloat(),
      check("precioVenta","Ingrese un precio venta válido.").exists(),
    ],
    auth,
    acceso("Administrador", "Gerente general"),
    crearProducto
  );

router.route("/:id").get(auth, obtenerProductoPorId);

module.exports = router;
