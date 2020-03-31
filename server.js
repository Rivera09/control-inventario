const express = require('express');
const db = require('./config/db');

db();

const app = express();
app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.send('API test'));

const usuarios = require('./routes/usuarios');

app.use('/api/usuarios',usuarios);


app.listen(5000,()=>console.log('Conectado en el puerto 5000'));