const express = require('express');
const {iniciarSesion}=require('../controllers/auth');


const router = express.Router();

router.route('/').post(iniciarSesion);

module.exports = router;