const { Sequelize,QueryTypes } = require("sequelize");
const conexion = require("../config/db");

let Clientes = conexion.define(
  "Clientes",
  {
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    balance: Sequelize.FLOAT,
    rtn: Sequelize.STRING,
  },
  {
    schema: "Clientes",
    timestamps: false,
  }
);

exports.crearCliente = async (nombre, email, balance, rtn) => {
  try {
    const [results] = await conexion.query(
      `EXECUTE Clientes.SP_CREAR_CLIENTES '${nombre}','${email}',${balance},'${rtn}'`
    );
    return results[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerClientePorRtn = async (rtn) => {
  try {
    return await Clientes.findOne({ where: { rtn } });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerClientes = async () => {
  try {
    return await conexion.query("SELECT * FROM Clientes.VIEW_OBTENER_CLIENTES", {
      type: QueryTypes.SELECT,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
