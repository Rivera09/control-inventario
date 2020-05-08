const express = require('express');
const {crearIsv} = require('../controllers/isv');

const router = express.Router();

router.route('/').post(crearIsv);

module.exports = router;

