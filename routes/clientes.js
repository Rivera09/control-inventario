const express = require("express");
const router = express.Router();
const {
  crearCliente,
  obtenerClientePorRtn,
} = require("../controllers/clientes");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const acceso = require("../middleware/acceso");

router
  .route("/")
  .post(
    [
      check("nombre").exists(),
      check("email").isEmail(),
      check("balance").isFloat(),
      check("rtn").isLength({ min: 14, max: 14 }),
    ],
    auth,
    acceso("Administrador", "Gerente general"),
    crearCliente
  );

router
  .route("/:rtn")
  .get(auth, acceso("Vendedor", "Administrador"), obtenerClientePorRtn);

module.exports = router;
