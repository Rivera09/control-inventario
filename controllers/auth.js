const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuarios = require("../modules/Usuarios");

//@route    POST api/auth/
//@desc     Iniciar sesión
//@access   Public
exports.iniciarSesion = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    const usuario = await Usuarios.obtenerUsuarioPorEmail(email);
    if (!usuario)
      return res.status(400).json({ msg: "Credenciales no válidas" });
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide)
      return res.status(400).json({ msg: "Credenciales no válidas" });
    jwt.sign(
      {
        id: usuario.id
      },
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRES_IN},
      (error, token) => {
        if (error) throw error;
        return res.status(201).json({
          msg: "Login exitoso",
          token,
          id:usuario.id,
          nombre:usuario.nombre
        });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};
