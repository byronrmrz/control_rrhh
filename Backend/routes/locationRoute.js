const express = require("express");
const { createCountry, createDepto, createMunicipio, getCountries, getDeptos, getMunicipios, deleteCountry,deleteDepartamento,deleteMunicipio,actualizarPais,actualizarDepartamento,actualizarMunicipio} = require('../controllers/locationController');

const router = require('express').Router();

router.post('/crearPais', createCountry);
router.post('/crearDepartamento', createDepto);
router.post('/crearMunicipio', createMunicipio);
router.get('/getAllCountries', getCountries);
router.get('/getAllDepartamentos', getDeptos);
router.get('/getAllMunicipios', getMunicipios);
router.put('/borrarPais/:pais_id', deleteCountry);
router.put('/borrarDepartamento/:departamento_id', deleteDepartamento);
router.put('/borrarMunicipio/:municipio_id', deleteMunicipio);
router.put('/actualizarPais/:pais_id', actualizarPais);
router.put('/actualizarDepartamento/:departamento_id', actualizarDepartamento);
router.put('/actualizarMunicipio/:municipio_id', actualizarMunicipio);











module.exports = router;
