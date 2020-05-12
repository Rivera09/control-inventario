const { Sequelize } = require('sequelize');
const conexion = require('../config/db');
let Proveedores = conexion.define('Proveedores',{
    nombre:Sequelize.STRING,
    telefono:Sequelize.STRING,
    email:Sequelize.STRING
},{
    timestamps:false,
    schema:'Bodega'
});

exports.crearProveedor = async (
    nombre,
    telefono,
    email) =>{
    try {
        await conexion.sync();
        return await Proveedores.create({
            nombre,
            telefono,
            email
        });
    } catch (e) {
        throw new Error(e.message);
    }
}