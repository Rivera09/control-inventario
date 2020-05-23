const Usuarios = require("../modules/Usuarios");
const TipoUsuarios = require("../modules/TipoUsuarios");
const bcrypt = require("bcryptjs");
const respuestaError = require("../utils/respuestaError");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//@route    POST api/usuarios/
//@desc     Crear un nuevo usuario.
//@access   Private
exports.crearUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return respuestaError(400, "Credenciales no válidas", errors.array(), res);
  const {
    nombre,
    email,
    contrasena,
    telefono,
    idTipoUsuario,
    identidad,
    observaciones,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const encriptada = await bcrypt.hash(contrasena, salt);

    const usuario = await Usuarios.crearUsuario(
      nombre,
      email,
      encriptada,
      telefono,
      idTipoUsuario,
      identidad,
      observaciones
    );
    const tipoUsuario = await TipoUsuarios.obtenerDescripcion(
      usuario.idTipoUsuario
    );
    jwt.sign(
      {
        id: usuario.id,
        tipo: tipoUsuario.descripcion,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (error, token) => {
        if (error) throw error;
        return res.json({
          mensaje: "Usuario creado exitosamente",
          token,
          id: usuario.id,
          nombre: usuario.nombre,
          tipo: tipoUsuario.descripcion,
          identidad: usuario.identidad,
        });
      }
    );
  } catch (e) {
    console.log(e);
    return respuestaError(
      500,
      "Error de servidor",
      [{ mensaje: "Error intentando crear usuario" }],
      res
    );
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    res.json(await Usuarios.obtenerUsuario());
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ mensaje: "Error intentando obtener los Usuarios" }],
      res
    );
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Usuarios.obtenerUsuarioPorId(id);
    if (!usuario)
      return respuestaError(
        400,
        "id de usuario no válido",
        [{ mensaje: "El id especificado no es válido" }],
        res
      );
    const tipoUsuario = await TipoUsuario.obtenerDescripcion(
      usuario.idTipoUsuario
    );
    return res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      tipo: tipoUsuario.descripcion,
      identidad: usuario.identidad,
      observaciones: usuario.observaciones,
    });
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
