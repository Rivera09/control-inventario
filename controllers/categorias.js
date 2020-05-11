const Categorias = require("../modules/Categorias");
const repuestaError = require("../utils/respuestaError");
exports.ObtenerCategorias= async (req, res) => {
  try {
    res.json(await Categorias.ObtnerCategorias());
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



