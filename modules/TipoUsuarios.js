const { Sequelize } = require("sequelize");
const conexion = require("../config/db");
let TipoUsuario = conexion.define(
  "TipoUsuario",
  {
    descripcion: Sequelize.STRING,
  },
  {
    timestamps: false,
    schema: "RecursosHum",
  }
);

exports.obtenerDescripcion = async (id) => {
  try {
    await conexion.sync();
    return await TipoUsuario.findByPk(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerTiposUsuario = async () => {
  try {
    return await TipoUsuario.findAll();
  } catch (e) {
    throw new Error(e.message);
  }
};
