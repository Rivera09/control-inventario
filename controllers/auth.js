const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuarios = require("../modules/Usuarios");
const TipoUsuarios = require("../modules/TipoUsuarios");
const repuestaError = require("../utils/respuestaError");


//@route    POST api/auth/
//@desc     Iniciar sesión
//@access   Public
exports.iniciarSesion = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    const usuario = await Usuarios.obtenerUsuarioPorEmail(email);
    if (!usuario)
      return res.status(400).json({
        mensaje: "Credenciales no válidas",
        errores: [
          {
            mensaje: "Email y/o contaseña incorrectos.",
          },
        ],
      });
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    const tipo = await TipoUsuarios.obtenerDescripcion(usuario.idTipoUsuario);
    if (!coincide)
      return res.status(400).json({
        mensaje: "Credenciales no válidas",
        errores: [
          {
            mensaje: "Email y/o contaseña incorrectos.",
          },
        ],
      });
    jwt.sign(
      {
        id: usuario.id,
        tipo: tipo.descripcion,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (error, token) => {
        if (error) throw error;
        return res.status(201).json({
          msg: "Login exitoso",
          token,
          id: usuario.id,
          nombre: usuario.nombre,
          tipo: tipo.descripcion,
        });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

exports.obtenerUsuarioPorToken = async (req, res) => {
  const id = req.usuario.id;
  try {
    const usuario = await Usuarios.obtenerUsuarioPorId(id);
    if (!usuario)
      return respuestaError(
        400,
        "id de usuario no válido",
        [{ mensaje: "El id especificado no es válido" }],
        res
      );
    return res.json(usuario);
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ mensaje: "Error intentando obtener el usuario" }],
      res
    );
  }
};
