const {Router} = require('express');
const {body, query} = require('express-validator');
const rutas= Router();
const controladorPedidos_mesa = require('../controladores/controladorPedidos_mesa');

rutas.get('/listar', controladorPedidos_mesa.Listar);

rutas.post('/guardar', controladorPedidos_mesa.Guardar);

rutas.put('/modificar', controladorPedidos_mesa.Modificar);

rutas.delete('/eliminar', controladorPedidos_mesa.Eliminar);


module.exports = rutas;