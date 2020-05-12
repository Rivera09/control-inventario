const express = require('express');
const router = express.Router();
const {check} = require ('express-validator');

const {crearProducto} = require("../controllers/productos");

router.route('/').post(crearProducto);

module.exports = router;