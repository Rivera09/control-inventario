const express = require("express");
const router = express.Router();
const { crearProveedor } = require("../controllers/proveedores");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const acceso = require("../middleware/acceso");

router
  .route("/")
  .post(
    [
      check("nombre","Por favor ingrese un nombre válido.").exists().isLength({min:3}),
      check("email","Por favor ingrese un email válido.").isEmail(),
      check("telefono","Ingrese un número de teléfono válido").isLength({ min: 8, max: 8 }),
    ],
    auth,
    acceso("Administrador", "Gerente general"),
    crearProveedor
  );

module.exports = router;
