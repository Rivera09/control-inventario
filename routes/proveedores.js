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
      check("nombre").exists(),
      check("email").isEmail(),
      check("telefono").isLength({ min: 8, max: 8 }),
    ],
    auth,
    acceso("Administrador", "Gerente general"),
    crearProveedor
  );

module.exports = router;
