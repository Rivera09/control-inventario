require('dotenv').config({path:'./config/config.env'});
const express = require('express');
const conexion = require('./config/db');
const app = express();

app.use(express.json({extended:false}));

//Probando la conexión a la base de datos
conexion.authenticate().then(()=>{
  console.log("Conectado a la bd");
},err=>{
  console.log("Error al conectarse a la bd");
  process.exit(1);
})


// Rutas
const isv = require('./routes/isv');
const usuarios = require('./routes/usuarios');

//
app.use('/api/isv',isv);
app.use('/api/usuarios',usuarios);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Servidor corriendo en el pueto ${PORT}`));