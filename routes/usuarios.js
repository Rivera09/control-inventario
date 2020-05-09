const express = require('express');
const router = express.Router();
const {check} = require('express-validator');


const {crearUsuario} = require('../controllers/usuarios');

router.route('/').post([
    check("email").isEmail(),
    check("contrasena").isLength({min:6}),
    check("nombre").exists(),
    check("telefono").exists(),
    check("identidad").isLength({min:13,max:13}),
    check("idTipoUsuario").exists()
],crearUsuario);

module.exports = router;