const express = require('express');
const router = express.Router();
const {crearProveedor} = require("../controllers/proveedores");

router.route("/").post(crearProveedor)




module.exports = router;