const express = require('express');
// const db = require('./config/db');


//
const { Sequelize, Model, DataTypes } = require('sequelize');
// const Sequelize = require('sequelize');

let conexion = new Sequelize('ingresos ','adminUser','asd.4567',{
    host:'20161002921.database.windows.net',
    dialect:'mssql',
    dialectOptions: { 
        options: {
          encrypt: true,
          schema:'example'
        }
      }
});

let Categories = conexion.define('Categories',{
    CategoryName:Sequelize.STRING,
    Description:Sequelize.STRING
});

// conexion.sync().then(()=>{
//     Categories.create({
//         CategoryName:"Test category",
//         Description:"This is a conection test"
//     })
// },err=>{
//     console.log(err);
// })
// 

// db();

const app = express();
app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.send('API test'));

const usuarios = require('./routes/usuarios');

app.use('/api/usuarios',usuarios);


app.listen(5000,()=>console.log('Conectado en el puerto 5000'));