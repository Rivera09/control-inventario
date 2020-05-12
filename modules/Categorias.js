const { Sequelize } = require('sequelize');
const conexion = require('../config/db');
let Categorias = conexion.define('Categorias',{
    descripcion:Sequelize.STRING,
    idIsv:Sequelize.INTEGER
},{
    schema:'Bodega',
    timestamps:false
});

exports.crearCategoria = (descripcion,idIsv)=>{
    conexion.sync().then(()=>{
        Categorias.create({
            descripcion,
            idIsv
        })
    })
}


exports.obtnerCategorias = async () => {
    try {
      return await Categorias.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  };
