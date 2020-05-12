const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const acceso = require('../middleware/acceso');
const {obtenerUsuario} = require("../controllers/usuarios");
const {crearUsuario} = require('../controllers/usuarios');

router.route('/').post([
    check("email").isEmail(),
    check("contrasena").isLength({min:6}),
    check("nombre").exists(),
    check("telefono").exists(),
    check("identidad").isLength({min:13,max:13}),
    check("idTipoUsuario").exists()
],crearUsuario);

router.route("/").get(),

module.exports = router;