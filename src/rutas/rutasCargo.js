const {Router} = require('express')
const {body, query} = require('express-validator')
const rutas = Router()

const controladorCargo = require('../controladores/controladorCargo')

rutas.get('/listar', controladorCargo.Listar)

rutas.post('/guardar', 
body('nombre')
.notEmpty().withMessage('Debe escribir el nombre del cargo')
.isLength({min: 3}).withMessage('El nombre del cargo debe tener al menos 3 caracteres'),
controladorCargo.Guardar)

rutas.post('/editar',
query('id')
.notEmpty().withMessage('Debe escribir el id del cargo')
.isInt().withMessage('El id del cargo debe ser un entero'),
body('nombre')
.notEmpty().withMessage('Debe escribir el nombre del cargo')
.isLength({min: 3}).withMessage('El nombre del cargo debe tener al menos 3 caracteres'),
controladorCargo.Editar)

rutas.post('/eliminar', controladorCargo.Eliminar)

module.exports = rutas