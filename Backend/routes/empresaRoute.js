const express = require("express");
const { createEmpresa, getEmpresaPorPais,actualizarEmpresa, getEmpresas} = require('../controllers/empresaController');

const router = require('express').Router();

router.post('/crearEmpresa', createEmpresa);
router.get('/traerEmpresas/:pais_id', getEmpresaPorPais);
router.get('/traerTodasEmpresas', getEmpresas);
router.put('/actualizarEmpresa/:empresa_id', actualizarEmpresa);



module.exports = router;
