const Sequelize = require("sequelize");
const conexion = require("../config/db");

const Usuarios = conexion.define(
  "Usuarios",
  {
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    contrasena: Sequelize.STRING,
    telefono: Sequelize.STRING,
    idTipoUsuario: Sequelize.INTEGER,
    identidad: Sequelize.STRING,
    observaciones: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
  },
  {
    schema: "RecursosHum",
    timestamps: false,
  }
);

exports.crearUsuario = async (
  nombre,
  email,
  contrasena,
  telefono,
  idTipoUsuario,
  identidad,
  observaciones
) => {
  try {
    await conexion.sync();
    await Usuarios.create({
      nombre,
      email,
      telefono,
      idTipoUsuario,
      contrasena,
      identidad,
      observaciones,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};