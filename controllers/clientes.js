const Cliente = require("../modules/Clientes");
const { validationResult } = require("express-validator");
const respuestaError = require("../utils/respuestaError");

//@route    POST api/clientes/
//@desc     Crear un nuevo cliente.
//@access   Private
exports.crearCliente = async (req, res) => {
  const { nombre, email, balance, rtn } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return respuestaError(400, "Credenciales no válidas", errors.array(), res);
  try {
    const cliente = await Cliente.crearCliente(nombre, email, balance, rtn);
    return res.status(201).json({
      Mensaje: "creado exitosamente",
      id: cliente.id,
      nombre: cliente.nombre,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("error de servidor");
  }
};
