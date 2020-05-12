const { Sequelize } = require('sequelize');
const conexion = require('../config/db');
let Isv = conexion.define('Isv',{
    porcentaje:Sequelize.FLOAT
},{
    timestamps:false,
    schema:'Bodega'
});

exports.crearIsv = async (porcentaje)=>{
    try {
        return await Isv.create({
            porcentaje
        })
    } catch (e) {
        throw new Error(e.message);
    }
}
