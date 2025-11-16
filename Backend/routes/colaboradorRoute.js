const express = require("express");
const { createColaborador, getAllColaboradores,actualizarColaborador} = require('../controllers/colaboradorController');

const router = require('express').Router();

router.post('/crearColaborador', createColaborador);
router.get('/traerColaboradores', getAllColaboradores);
router.put('/actualizarColaborador/:empleado_id', actualizarColaborador);



module.exports = router;
