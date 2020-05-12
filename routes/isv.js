const express = require("express");
const { crearIsv } = require("../controllers/isv");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const acceso = require("../middleware/acceso");

const router = express.Router();

router
  .route("/")
  .post(
    [check("porcentaje").isFloat()],
    auth,
    acceso("Administrador", "Gerente general"),
    crearIsv
  );

module.exports = router;
