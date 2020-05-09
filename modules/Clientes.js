const { Sequelize } = require('sequelize');
const conexion = require('../config/db');
let Clientes = conexion.define('Clientes',{
    nombre:Sequelize.STRING,
    email:Sequelize.STRING,
    balance:Sequelize.FLOAT,
    rtn:Sequelize.STRING
},{
    schema:'Clientes'
});