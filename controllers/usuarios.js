const Usuarios = require("../modules/Usuarios");
const bcrypt = require("bcryptjs");
const respuestaError = require("../utils/respuestaError");
const { validationResult } = require("express-validator");

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

    const { success, msg } = await Usuarios.crearUsuario(
      nombre,
      email,
      encriptada,
      telefono,
      idTipoUsuario,
      identidad,
      observaciones
    );
    if (success === 1) return res.status(201).json({ msg });
    return respuestaError(400, "Valores no válidos.", [{ msg }], res);
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
