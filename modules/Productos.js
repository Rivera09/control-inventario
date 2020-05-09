const { Sequelize } = require('sequelize');
const conexion = require('../config/db');
let Productos = conexion.define('Productos',{
    nombre:Sequelize.STRING,
    cantidad:Sequelize.INTEGER,
    idCategoria:Sequelize.INTEGER,
    idProveedor:Sequelize.INTEGER,
    descripcion:Sequelize.STRING,
    precioCompra:Sequelize.FLOAT,
    precioVenta:Sequelize.FLOAT
},{
    timestamps:false,
    schema:'Bodega'
});

exports.crearProducto= async(nombre,cantidad,idCategoria,idProveedor,descripcion,precioCompra,precioVenta)=>{
    try {
        await conexion.sync();
        return await Productos.create({
            nombre,
            cantidad,
            idCategoria,
            idProveedor,
            descripcion,
            precioCompra,
            precioVenta
        });
    } catch (e) {
        throw new Error(e.message);
    }
}