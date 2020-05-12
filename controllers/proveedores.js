const Proveedor = require("../modules/Proveedores");
const { validationResult } = require("express-validator");
const respuestaError = require("../utils/respuestaError");


//@route    POST api/proveedores/
//@desc     Crear un nuevo proveedor.
//@access   Private
exports.crearProveedor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return respuestaError(400, "Credenciales no válidas", errors.array(), res);

  const { nombre, telefono, email } = req.body;

  try {
    const proveedor = await Proveedor.crearProveedor(nombre, telefono, email);
    return res.status(201).json({
      mensaje: "Proveedor creado",
      id: proveedor.id,
      nombre: proveedor.nombre,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("error de servidor");
  }
};
