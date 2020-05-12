const respuestaError = require("../utils/respuestaError");
const Usuarios = require("../modules/Usuarios");
module.exports = (...tipos) => {
  return (req, res, next) => {
    Usuarios.obtenerUsuarioPorId(req.usuario.id).then(
      (usuario) => {
        if (!usuario)
          return respuestaError(
            401,
            "Acceso denegado",
            [{ msg: "Este usuario ya no tiene acceso al sistema." }],
            res
          );
      },
      (error) => {
        console.log(error);
        respuestaError(
          500,
          "Error de servidor.",
          [
            {
              msg:
                "Hubo un problema al intentar comprar el usuario. Por favor intentelo de nuevo",
            },
          ],
          res
        );
      }
    );
    if (!tipos.includes(req.usuario.tipo))
      return respuestaError(
        401,
        "Acceso denegado",
        [
          {
            msg: `Los usuarios tipo ${req.usuario.tipo} no tienen acceso a este recurso`,
          },
        ],
        res
      );
    next();
  };
};

const comprobarUsuario = async (id, res) => {
  try {
    const usuario = await Usuarios.obtenerUsuarioPorId(req.usuario.id);
    if (!usuario)
      return respuestaError(
        401,
        "Acceso denegado",
        [{ msg: "Este usuario ya no tiene acceso al sistema" }],
        res
      );
  } catch (e) {
    console.log(e);
    respuestaError(
      500,
      "Error de servidor.",
      [
        {
          msg:
            "Hubo un problema al intentar comprar el usuario. Por favor intentelo de nuevo",
        },
      ],
      res
    );
  }
};
