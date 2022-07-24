const {Router} = require('express')
const {body, query} = require('express-validator')
const rutas = Router()

const entregaPedidos = require('../controladores/controladorEntregaPedidos')

rutas.get('/listar', entregaPedidos.Listar)
rutas.get('/listarentregas', entregaPedidos.listarEntregas)

rutas.post('/guardar', 
body('idDetalle')
.isInt().withMessage('El ID detalle debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
body('usuario')
.isInt().withMessage('El ID usuario debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
body('identrega')
.isInt().withMessage('El ID entrega debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
entregaPedidos.Guardar)

rutas.post('/editar',
query('idDetalle')
.isInt().withMessage('Debe de ser un entero')
.notEmpty().withMessage('Debe enviar el Id del campo a actualizar'),
body('usuario')
.isInt().withMessage('El ID debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
body('identrega')
.isInt().withMessage('El ID debe ser un entero')
.notEmpty().withMessage('Debe llenar el campo'),
entregaPedidos.Editar)

rutas.delete('/eliminar',
query('idDetalle')
.notEmpty().withMessage('Debe escribir el ID de registro')
.isInt().withMessage('El ID debe ser un entero'),
entregaPedidos.Eliminar)

module.exports = rutas