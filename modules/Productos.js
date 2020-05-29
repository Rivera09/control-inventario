const { Sequelize, QueryTypes } = require("sequelize");
const conexion = require("../config/db");
let Productos = conexion.define(
  "Productos",
  {
    nombre: Sequelize.STRING,
    cantidad: Sequelize.INTEGER,
    idCategoria: Sequelize.INTEGER,
    idProveedor: Sequelize.INTEGER,
    descripcion: Sequelize.STRING,
    precioCompra: Sequelize.FLOAT,
    precioVenta: Sequelize.FLOAT,
  },
  {
    timestamps: false,
    schema: "Bodega",
  }
);

exports.crearProducto = async (
  nombre,
  cantidad,
  idCategoria,
  idProveedor,
  descripcion,
  precioCompra,
  precioVenta
) => {
  try {
    const [results] = await conexion.query(
      `EXECUTE Bodega.SP_CREAR_PRODUCTO '${nombre}','${cantidad}',${idCategoria},${idProveedor},'${descripcion}',${precioCompra},${precioVenta}`
    );
    return results[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerProductos = async () => {
  try {
    return await conexion.query("select * from Bodega.VIEW_OBTENER_PRODUCTOS", {
      type: QueryTypes.SELECT,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.obtenerProductoPorId = async (id) => {
  try {
    return await Productos.findByPk(id);
  } catch (e) {
    throw new Error(e.message);
  }
};
