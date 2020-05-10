const Usuarios = require("../modules/Usuarios");
const TipoUsuario = require('../modules/TipoUsuarios');
const bcrypt = require("bcryptjs");
const respuestaError = require("../utils/respuestaError");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

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
    const tipoUsuario = await TipoUsuario.obtenerDescripcion(usuario.idTipoUsuario);
    // console.log(tipoUsuario);
    console.log(`--------usuario.Tip: ${usuario.idTipoUsuario}`);
    return res.json({
      msg: "Usuario creado exitosamente",
      id: usuario.id,
      nombre: usuario.nombre,
      tipo:tipoUsuario.descripcion,
      identidad: usuario.identidad,
    });
  } catch (e) {
    console.log(e);
    return respuestaError(
      500,
      "Error de servidor",
      [{ msg: "Error intentando crear usuario" }],
      res
    );
  }
};
