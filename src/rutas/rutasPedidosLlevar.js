const {Router} = require('express')
const {body, query} = require('express-validator')
const rutas = Router()

const controladorPedidosLlevar = require('../controladores/controladorPedidosLlevar')

rutas.get('/listar', controladorPedidosLlevar.Listar);
rutas.get('/listarpedidos', controladorPedidosLlevar.listarPedidos);
rutas.get('/nuevo', controladorPedidosLlevar.Nuevo);
rutas.get('/buscar', controladorPedidosLlevar.Buscar);
rutas.get('/buscarid', controladorPedidosLlevar.BuscarId);


rutas.post('/guardar', 
body('idPedido')
.isInt().withMessage('El ID debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
controladorPedidosLlevar.Guardar)

rutas.put('/editar',
query('id')
.notEmpty().withMessage('Debe escribir el ID de registro')
.isInt().withMessage('El ID debe ser un entero'),
body('idPedido')
.notEmpty().withMessage('Debe escribir el ID de pedido')
.isInt().withMessage('El ID debe ser un entero'),
body('idCliente')
.notEmpty().withMessage('Debe escribir el ID del cliente')
.isInt().withMessage('El ID debe ser un entero'),
controladorPedidosLlevar.Editar)

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('Debe escribir el ID de registro')
.isInt().withMessage('El ID debe ser un entero'),
 controladorPedidosLlevar.Eliminar)

module.exports = rutas