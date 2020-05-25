const { Sequelize, QueryTypes } = require("sequelize");
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
    return await Usuarios.create({
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

exports.obtenerUsuarioPorEmail = async (email) => {
  try {
    return await Usuarios.findOne({ where: { email } });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerUsuarioPorId = async (id) => {
  try {
    return await conexion.query(
      `select * from RecursosHum.VIEW_OBTENER_USUARIO WHERE id=${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerUsuario = async () => {
  try {
    return await Usuarios.findAll();
  } catch (e) {
    throw new Error(e.message);
  }
};
