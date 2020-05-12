const express = require('express');
const router = express.Router();
const {check} = require ('express-validator');
const auth = require ("../middleware/auth");
const acceso = require ("../middleware/acceso");

const {crearProducto} = require("../controllers/productos");

router.route('/').post([
    check("nombre").exists(),
    check("cantidad").exists(),
    check("idCategoria").exists(),
    check("idProveedor").exists(),
    check("descripcion").exists(),
    check("precioCompra").exists(),
    check("precioVenta").exists()
], auth, acceso("Administrador", "Gerente general"), crearProducto);

module.exports = router;