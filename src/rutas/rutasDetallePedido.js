const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorDetallePedido = require('../controladores/controladorDetallePedido');
const rutas = Router();

rutas.get('/listar', controladorDetallePedido.Listar);
rutas.get('/buscarid', controladorDetallePedido.BuscarId);

rutas.get('/nuevo', controladorDetallePedido.Nuevo);
rutas.get('/buscar', controladorDetallePedido.Buscar);

rutas.post('/guardar', 
body('NumeroPedido')
.notEmpty().withMessage('El NumeroPedido es requerido'),

body('CodigoProducto')
.notEmpty().withMessage('El CodigoProducto es requerido'),

body('Cantidad')
.notEmpty().withMessage('La Cantidad es requerida')
.isInt().withMessage('La Cantidad debe ser un numero entero'),
controladorDetallePedido.Guardar);

rutas.post('/guardarbulk',
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.NumeroPedidos')
.notEmpty().withMessage("No se aceptan valores vacios para el NumeroPedidos")
.isInt().withMessage("El NumeroPedidos debe ser un numero entero"),
body('*.CodigoProducto')
.notEmpty().withMessage("No se aceptan valores vacios para el CodigoProducto")
.isInt().withMessage("El CodigoProducto debe ser un numero entero"),
body('*.Cantidad')
.notEmpty().withMessage("No se aceptan valores vacios para el Cantidad")
.isInt().withMessage("El Cantidad debe ser un numero entero"),
controladorDetallePedido.GuardarBulk)

module.exports = rutas;

rutas.put('/editar', 
query('id')
.notEmpty().withMessage('El idregistro es requerido')
.isInt().withMessage('El idregistro debe ser un numero entero'),

body('NumeroPedido')
.notEmpty().withMessage('El NumeroPedidos es requerido'),

body('CodigoProducto')
.notEmpty().withMessage('El CodigoProducto es requerido'),

body('Cantidad')
.notEmpty().withMessage('La Cantidad es requerida')
.isInt().withMessage('La Cantidad debe ser un numero entero'),
controladorDetallePedido.Editar)

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El idregistro es requerido')
.isInt().withMessage('El idregistro debe ser un numero entero'),
controladorDetallePedido.Eliminar)

module.exports = rutas;