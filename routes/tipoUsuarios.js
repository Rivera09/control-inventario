const express = require('express');
const {obtenerTiposUsuario} = require('../controllers/tipoUsuarios');

const router = express.Router();

router.route('/').get(obtenerTiposUsuario);

module.exports = router;