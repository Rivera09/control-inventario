const { Sequelize } = require('sequelize');
const conexion = require('../config/db');

let Clientes = conexion.define(
    'Clientes',{
    nombre:Sequelize.STRING,
    email:Sequelize.STRING,
    balance:Sequelize.FLOAT,
    rtn:Sequelize.STRING,
},
{
    schema:'Clientes',
    timestamps: false,

});

exports.crearCliente = async (
    nombre,
    email,
    balance,
    rtn,
    ) => {

    try {
        await conexion.sync();
        return await Clientes.create ({
            nombre,
            email,
            balance,
            rtn,   
        });
    } 
    catch (e) {
        throw new Error (e.message);
    }
};
    