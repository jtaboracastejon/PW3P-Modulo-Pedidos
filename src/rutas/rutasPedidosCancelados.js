const {Router} = require('express')
const {body, query} = require('express-validator')
const rutas = Router()

const controladorPedidosCancelados = require('../controladores/controladorPedidosCancelados')

rutas.get('/listar', controladorPedidosCancelados.Listar);

rutas.get('/nuevo', controladorPedidosCancelados.nuevo);

rutas.get('/buscar', controladorPedidosCancelados.buscar);

rutas.get('/buscarId', controladorPedidosCancelados.BuscarId);

rutas.post('/guardar', 
body('id')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('idusuario')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('fechahora')
.notEmpty().withMessage('Debe escribir el fechahora pedido cancelado')
.isLength({min: 3}).withMessage('El numero fechahora del pedido cancelado debe tener al menos 50 caracteres'),
controladorPedidosCancelados.Guardar)

rutas.put('/editar',
query('id')
.notEmpty().withMessage('Debe escribir el id del pedido cancelado')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('idusuario')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('fechahora')
.notEmpty().withMessage('Debe escribir el fechahora pedido cancelado')
.isLength({min: 3}).withMessage('El numero fechahora del pedido cancelado debe tener al menos 50 caracteres'),
controladorPedidosCancelados.Editar)

rutas.delete('/eliminar', controladorPedidosCancelados.Eliminar)

module.exports = rutas