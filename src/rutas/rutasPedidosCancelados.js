const {Router} = require('express')
const {body, query} = require('express-validator')
const rutas = Router()

const controladorPedidosCancelados = require('../controladores/controladorPedidosCancelados')

rutas.get('/listar', controladorPedidosCancelados.Listar)

rutas.post('/guardar', 
body('id')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('usuario')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('fechahora')
.notEmpty().withMessage('Debe escribir el fechahora pedido cancelado')
.isLength({min: 3}).withMessage('El numero fechahora del pedido cancelado debe tener al menos 50 caracteres'),
controladorPedidosCancelados.Guardar)

rutas.post('/editar',
query('id')
.notEmpty().withMessage('Debe escribir el id del pedido cancelado')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('usuario')
.isInt().withMessage('El id del pedido cancelado debe ser un entero'),
body('fechahora')
.notEmpty().withMessage('Debe escribir el fechahora pedido cancelado')
.isLength({min: 3}).withMessage('El numero fechahora del pedido cancelado debe tener al menos 50 caracteres'),
controladorPedidosCancelados.Editar)

rutas.post('/eliminar', controladorPedidosCancelados.Eliminar)

module.exports = rutas