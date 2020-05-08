const express = require('express');
const router = express.Router();

const {crearUsuario} = require('../controllers/usuarios');

router.route('/').post(crearUsuario);

module.exports = router;