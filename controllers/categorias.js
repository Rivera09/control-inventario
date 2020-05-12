const Categorias = require("../modules/Categorias");
const Isv = require("../modules/Isv");
const repuestaError = require("../utils/respuestaError");
const { validationResult } = require("express-validator");

//@route    GET api/categorias/
//@desc     Obtener todas las categorías existentes.
//@access   Private
exports.obtenerCategorias = async (req, res) => {
  try {
    res.json(await Categorias.obtnerCategorias());
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ msg: "Error al intentar obtener las categorias" }],
      res
    );
  }
};

//@route    POST api/categorias/
//@desc     Crear nueva categoría.
//@access   Private
exports.crearCategoria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return repuestaError(400, "Credenciales no válidas", errors.array(), res);
  const { descripcion, idIsv } = req.body;
  try {
    const categoria = await Categorias.crearCategoria(descripcion, idIsv);
    const isv = await Isv.obtenerIsvPorId(categoria.idIsv);
    return res.status(201).json({
      mensaje: "Creado exitsamente",
      descripcion: categoria.descripcion,
      isv: isv.porcentaje,
    });
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ msg: "Error al intentar crear categoría." }],
      res
    );
  }
};
