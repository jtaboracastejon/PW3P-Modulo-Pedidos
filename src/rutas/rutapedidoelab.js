const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorpedidoselaborados = require('../controladores/controladorpedidoselab');
const rutas = Router();



//*Listar
rutas.get('/listar', controladorpedidoselaborados.Listar);


//*Guardar
rutas.post('/guardar',
body ('iddetallepedido')
.notEmpty().withMessage('Debe enviar idpedidoselaborados') //con esto validamos de que el campo no vaya vacio 
.isInt().withMessage('El ID del pedido detalle debe ser un numero entero'),//con esta validamos que solo acepte numeros enteros
body ('idusuario')
.notEmpty().withMessage('Debe enviar idusuario'), //con esto validamos de que el campo no vaya vacio 
//con esta validamos que solo acepte numeros enteros
controladorpedidoselaborados.Guardar); 

//*Editar
rutas.post('/editar',
query('id')
.notEmpty().withMessage('El ID del detalle pedido no puede estar vacio')
.isInt().withMessage('El ID del detalle pedido debe ser un numero entero'),

body ('idusuario')
.notEmpty().withMessage('Debe enviar idpedidoselaborados') //con esto validamos de que el campo no vaya vacio 
.isInt().withMessage('El ID del pedido detalle debe ser un numero entero'),//con esta validamos que solo acepte numeros enteros
controladorpedidoselaborados.Editar);

//*Delete
rutas.post('/eliminar',
query('id')
.notEmpty().withMessage('El ID del detalle pedido no puede estar vacio')
.isInt().withMessage('El ID del detalle pedido debe ser un numero entero'),
controladorpedidoselaborados.Eliminar);

rutas.get('/nuevo', controladorpedidoselaborados.nuevo)

module.exports = rutas;