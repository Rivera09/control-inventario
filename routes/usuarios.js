const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const acceso = require("../middleware/acceso");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
} = require("../controllers/usuarios");

router
  .route("/")
  .post(
    [
      check("email","Ingrese un email válido.").isEmail(),
      check("contrasena","La contraseña debe tener al menos seis caracteres.").isLength({ min: 6 }),
      check("nombre","Ingrese un nombre válido.").exists().isLength({min:3}),
      check("telefono","Ingrese un número de teléfono válido.").exists().isLength({min:8,max:8}),
      check("identidad","Ingrese una identidad válida.").isLength({ min: 13, max: 13 }),
      check("idTipoUsuario").exists(),
    ],
    auth,
    acceso("Gerente general"),
    crearUsuario
  );
router.route("/:id").get(auth,acceso("Administrador","Gerente general"),obtenerUsuarioPorId);
router.route("/").get(auth, obtenerUsuarios);

module.exports = router;
