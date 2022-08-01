const {Router} = require('express')
const {body, query} = require('express-validator')
const rutas = Router()

const controladorPedidosVentas = require('../controladores/controladorPedidosVentas')

rutas.get('/listar', controladorPedidosVentas.Listar);
rutas.get('/listarventas', controladorPedidosVentas.listarPedidosVentas);
rutas.get('/nuevo', controladorPedidosVentas.Nuevo);
rutas.get('/buscar', controladorPedidosVentas.Buscar);
rutas.get('/buscarid', controladorPedidosVentas.BuscarId);



rutas.post('/guardar', 
body('numeroPedido')
.isInt().withMessage('El ID debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
controladorPedidosVentas.Guardar)

rutas.put('/editar',
query('id')
.notEmpty().withMessage('Debe escribir el ID de la factura')
.isInt().withMessage('El ID debe ser un entero'),
body('numeroPedido')
.notEmpty().withMessage('Debe escribir el ID de pedido')
.isInt().withMessage('El numero de pedido debe ser un entero'),
controladorPedidosVentas.Editar)

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('Debe escribir el numero de factura')
.isInt().withMessage('El numero debe ser un entero'),
controladorPedidosVentas.Eliminar)

module.exports = rutas