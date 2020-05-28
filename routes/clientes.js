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
      check("nombre","Ingrese un nombre válido").exists().isLength({min:3}),
      check("email","Ingrese un email válido.").isEmail(),
      check("balance","Ingrese un valor númerico").isFloat(),
      check("rtn","Ingrese un RTN válido.").isLength({ min: 14, max: 14 }),
    ],
    auth,
    crearCliente
  );

router
  .route("/:rtn")
  .get(auth, obtenerClientePorRtn);

module.exports = router;
