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
    const { success, msg } = await Proveedor.crearProveedor(
      nombre,
      telefono,
      email
    );
    if (success === 1) return res.status(201).json({ msg });
    return respuestaError(400, "Valores no válidos.", [{ msg }], res);
  } catch (e) {
    console.log(e);
    return res.status(500).send("error de servidor");
  }
};

//@route    POST api/proveedores/
//@desc     Crear un nuevo proveedor.
//@access   Private
exports.obtenerProveedores = async (req,res)=>{
  try {
    return res.json(await Proveedor.obtenerProveedores());
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ msg: "Error al intentar obtener los proveedores." }],
      res
    );
  }
}