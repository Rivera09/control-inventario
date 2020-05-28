const Clientes = require("../modules/Clientes");
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
    const cliente = await Clientes.crearCliente(nombre, email, balance, rtn);
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

//@route    GET api/clientes/:rtn
//@desc     Obtener cliente por rtn.
//@access   Private
exports.obtenerClientePorRtn = async (req, res) => {
  const rtn = req.params.rtn;
  try {
    const cliente = await Clientes.obtenerClientePorRtn(rtn);
    if (!cliente)
      return respuestaError(
        404,
        "No encontrado",
        [{ msg: "No se ha encontrado cliente con el rtn proporcionado." }],
        res
      );
    return res.json(cliente);
  } catch (e) {
    console.log(e);
    return respuestaError(
      500,
      "Error del servidor",
      [{ msg: "Error al intentar obtener datos del cliente" }],
      res
    );
  }
};

//@route    GET api/clientes/
//@desc     Obtener cliente por rtn.
//@access   Private
exports.obtenerClientes = async (req, res) => {
  try {
    return res.json(await Clientes.obtenerClientes());
  } catch (e) {
    console.log(e);
    return respuestaError(
      500,
      "Error del servidor",
      [{ msg: "Error al intentar obtener los clientes" }],
      res
    );
  }
};
