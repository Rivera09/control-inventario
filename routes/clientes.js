const express = require('express');
const router = express.Router();
const {crearCliente} = require("../controllers/clientes");

router.route("/").post(crearCliente)




module.exports = router;