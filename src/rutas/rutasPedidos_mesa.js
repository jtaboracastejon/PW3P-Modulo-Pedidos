const {Router} = require('express');
const {body, query} = require('express-validator');
const rutas= Router();
const controladorPedidos_mesa = require('../controladores/controladorPedidos_mesa');

rutas.get('/listar', controladorPedidos_mesa.Listar);

rutas.get('/nuevo', controladorPedidos_mesa.nuevo);

rutas.get('/buscarId', controladorPedidos_mesa.BuscarId);

rutas.get('/buscar', controladorPedidos_mesa.buscar);

rutas.post('/guardar',
body('idpedido')
.notEmpty().withMessage("El id de pedidos es necesario"),
controladorPedidos_mesa.Guardar);

rutas.put('/modificar',
query('id')
.notEmpty().withMessage("El id de registro es necesario y esta vacio"),
controladorPedidos_mesa.Modificar);

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El ID del pedido no puede estar vacio'),
controladorPedidos_mesa.Eliminar);


module.exports = rutas;