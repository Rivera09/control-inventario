const Productos = require("../modules/Productos");
const repuestaError = require("../utils/respuestaError");
exports.obtenerProductos= async (req, res) => {
  try {
    res.json(await Productos.obtenerProductos());
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ msg: "Error al intentar obtener los productos" }],
      res
    );
  }
};
