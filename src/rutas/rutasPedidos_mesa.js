const {Router} = require('express');
const {body, query} = require('express-validator');
const rutas= Router();
const controladorPedidos_mesa = require('../controladores/controladorPedidos_mesa');

rutas.get('/listar', controladorPedidos_mesa.Listar);

rutas.post('/guardar',
body('idpedido')
.notEmpty().withMessage("El id de pedidos es necesario"),
controladorPedidos_mesa.Guardar);

rutas.put('/modificar',
query('idregistro')
.notEmpty().withMessage("El id de registro es necesario y esta vacio"),
controladorPedidos_mesa.Modificar);

rutas.delete('/eliminar',
query('idregistro')
.notEmpty().withMessage('El ID del pedido no puede estar vacio'),
controladorPedidos_mesa.Eliminar);


module.exports = rutas;