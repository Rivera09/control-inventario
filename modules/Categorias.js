const { Sequelize } = require('sequelize');
const conexion = require('../config/db');
let Categorias = conexion.define('Categorias',{
    CategoryName:Sequelize.STRING,
    Description:Sequelize.STRING,
    idIsv:Sequelize.INTEGER
},{
    schema:'Bodega'
});

exports.crearCategoria = ({nombre,descripcion,idIsv})=>{
    conexion.sync().then(()=>{
        Categorias.create({
            nombre,
            descripcion,
            idIsv
        })
    })
}


exports.ObtnerCategorias = async () => {
    try {
      return await Categorias.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  };
