const express = require("express");
const router = express.Router();
const {
  crearCliente,
  obtenerClientePorRtn,
  obtenerClientes
} = require("../controllers/clientes");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.route('/').get(auth,obtenerClientes);

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
    crearCliente
  );

router
  .route("/:rtn")
  .get(auth, obtenerClientePorRtn);

module.exports = router;
