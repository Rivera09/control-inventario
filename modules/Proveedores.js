const { Sequelize, QueryTypes } = require("sequelize");
const conexion = require("../config/db");

let Proveedores = conexion.define(
  "Proveedores",
  {
    nombre: Sequelize.STRING,
    telefono: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    timestamps: false,
    schema: "Bodega",
  }
);

exports.crearProveedor = async (nombre, telefono, email) => {
  try {
    const [results] = await conexion.query(
      `EXECUTE Bodega.SP_CREAR_PROVEEDOR '${nombre}','${telefono}','${email}'`
    );
    const { success, msg } = results[0];
    return { success, msg };
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerProveedores = async () => {
  try {
    return await conexion.query("SELECT * FROM Bodega.VIEW_OBTENER_PROVEEDORES", {
      type: QueryTypes.SELECT,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerProveedorPorEmail = async (email) => {
  try {
    return await Proveedores.findOne({ where: { email } });
  } catch (e) {
    throw new Error(e.message);
  }
};
