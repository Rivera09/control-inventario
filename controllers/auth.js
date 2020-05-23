const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuarios = require("../modules/Usuarios");
const TipoUsarios = require("../modules/TipoUsuarios");

//@route    POST api/auth/
//@desc     Iniciar sesión
//@access   Public
exports.iniciarSesion = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    const usuario = await Usuarios.obtenerUsuarioPorEmail(email);
    if (!usuario)
      return res
        .status(400)
        .json({
          mensaje: "Credenciales no válidas",
          errores: [
            {
              mensaje:
                "No se encotró ningún usuario con las credenciales especificadas",
            },
          ],
        });
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    const tipo = await TipoUsarios.obtenerDescripcion(usuario.idTipoUsuario);
    if (!coincide)
      return res.status(400).json({ mensaje: "Credenciales no válidas" });
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
