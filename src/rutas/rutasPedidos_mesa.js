const {Router} = require('express');
const {body, query} = require('express-validator');
const rutas= Router();
const controladorPedidos_mesa = require('../controladores/controladorPedidos_mesa');

rutas.get('/listar', controladorPedidos_mesa.Listar);








module.exports = rutas;