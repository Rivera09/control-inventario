const jwt = require("jsonwebtoken");
const respuestaError = require("../utils/respuestaError");

module.exports = (req, res, next) => {
  try {
    const token = req.header("usuario-token");
    if (!token)
      return respuestaError(
        401,
        "Acceso denegado",
        [{ msg: "Necesita un token para acceder a este recurso" }],
        res
      );
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id)
      return respuestaError(
        401,
        "Acceso denegado",
        [{ msg: "Este token pertenece a una sesión que ha sido cerrada." }],
        res
      );
    req.usuario = {
      id: decoded.id,
      tipo: decoded.tipo,
    };
    next();
  } catch (e) {
    return respuestaError(
      401,
      "Acceso denegado",
      [{ msg: "El token no es válido." }],
      res
    );
  }
};
