const Isv = require("../modules/Isv");
const { validationResult } = require("express-validator");
const respuestaError = require("../utils/respuestaError");


//@route    POST api/isv/
//@desc     Crear un nuevo isv.
//@access   Privates
exports.crearIsv = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return respuestaError(400, "Credenciales no válidas", errors.array(), res);
  try {
    const isv = await Isv.crearIsv(req.body.porcentaje);
    return res.status(201).json({
        mensaje:"Isv creado exitosamente",
        porcentaje:isv.porcentaje
    });
  } catch (error) {
    console.log(error);
    respuestaError(
      500,
      "Error del servidor",
      [[{ msg: "Error intentando crear isv" }]],
      res
    );
  }
};
