const express = require('express');


const {obtenerUsuarios} = require('../modules/usuarios');
const router = express.Router();

// router.Route('/').get((req,res)=>res.send('conectado'));

router.get('/',obtenerUsuarios);

module.exports = router;