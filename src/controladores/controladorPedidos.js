const { validationResult } = require('express-validator');
const modeloPedidos = require('../modelos/modeloPedidos');
const modeloMeseros = require('../modelos/modeloMeseros');
const modeloEstaciones = require('../modelos/modeloEstaciones');
const { QueryTypes, sequelize } = require('sequelize');
const db = require('../configuracion/db');

//Funcion para obtener todos los pedidos de la tabla
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    try {
        const lista = await modeloPedidos.findAll({
            include: [{                
                model: modeloMeseros,
                attributes: ['nombre']
            }, {
                model: modeloEstaciones,
                attributes: ['nombre']
            }],
            //logging: console.log,
            raw: true
        });
        lista.forEach(element => {
            const estado = element.estado;
            if(estado[0] == 'S'){
                element.facturado = 'checked';
            }
            else{
                element.facturado = '';
            }
            if(estado[1] == 'S'){
                element.entregado = 'checked';
            }
            else{
                element.entregado = '';
            }
            if(estado[2] == 'S'){
                element.facturado = 'checked';
            }
            else{
                element.facturado = '';
            }
            // isset($pedido['activo'])? 'Activo':'Inactivo';
            element.activo = element.activo == '1' ? 'Pendiente' : 'Finalizado';
            if(element.modalidad == 'DO'){
                element.modalidad = 'Domicilio';
            }
            else if(element.modalidad == 'ME'){
                element.modalidad = 'Mesa';
            }
            else{
                element.modalidad = 'Llevar';
            }
        });
        console.log(lista);
        res.render("pedidosIndex", {
            titulo: 'Listado de pedidos',
            lista
        });
    }
    catch (error) {
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
};

exports.Nuevo = async (req, res) => {
    try {
        const listaMeseros = await modeloMeseros.findAll({
            raw: true
        });
        const listaEstaciones = await modeloEstaciones.findAll({
            raw: true
        });
        res.render("pedidosNuevo", {
            titulo: 'Nuevo pedido',
            listaMeseros,
            listaEstaciones
        });
    }
    catch (error) {
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
}

exports.Buscar = async (req, res) => {
    try {
        const lista = await modeloPedidos.findAll({
            /* where: {
                numero: req.body.numero
            }, */
            include: [{
                model: modeloMeseros,
                attributes: ['nombre']
            }, {
                model: modeloEstaciones,
                attributes: ['nombre']
            }],
            //logging: console.log,
            raw: true
        });
        lista.forEach(element => {
            const estado = element.estado;
            if(estado[0] == 'S'){
                element.facturado = 'checked';
            }
            else{
                element.facturado = '';
            }
            if(estado[1] == 'S'){
                element.entregado = 'checked';
            }
            else{
                element.entregado = '';
            }
            if(estado[2] == 'S'){
                element.facturado = 'checked';
            }
            else{
                element.facturado = '';
            }
            // isset($pedido['activo'])? 'Activo':'Inactivo';
            element.activo = element.activo == '1' ? 'Pendiente' : 'Finalizado';
            if(element.modalidad == 'DO'){
                element.modalidad = 'Domicilio';
            }
            else if(element.modalidad == 'ME'){
                element.modalidad = 'Mesa';
            }
            else{
                element.modalidad = 'Llevar';
            }
        });
        console.log(lista);
        res.render("pedidosBuscar", {
            titulo: 'Buscar pedido',
            lista
        });
    }
    catch (error) {
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
}

exports.Anulados = async (req, res) => {
    try {
        const lista = await modeloPedidos.findAll({
            where: {
                estado: 'AAA'
            },
            include: [{
                model: modeloMeseros,
                attributes: ['nombre']
            }, {
                model: modeloEstaciones,
                attributes: ['nombre']
            }],
            //logging: console.log,
            raw: true
        });
        lista.forEach(element => {
            const estado = element.estado;
            if(estado[0] == 'S'){
                element.facturado = 'checked';
            }
            else{
                element.facturado = '';
            }
            if(estado[1] == 'S'){
                element.entregado = 'checked';
            }
            else{
                element.entregado = '';
            }
            if(estado[2] == 'S'){
                element.facturado = 'checked';
            }
            else{
                element.facturado = '';
            }
            // isset($pedido['activo'])? 'Activo':'Inactivo';
            element.activo = element.activo == '1' ? 'Pendiente' : 'Finalizado';
            if(element.modalidad == 'DO'){
                element.modalidad = 'Domicilio';
            }
            else if(element.modalidad == 'ME'){
                element.modalidad = 'Mesa';
            }
            else{
                element.modalidad = 'Llevar';
            }
        });
        console.log(lista);
        res.render("pedidosAnulados", {
            titulo: 'Listado de pedidos anulados',
            lista
        });
    }
    catch (error) {
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
}


/* #Funcion para guardar un nuevo pedido que recibe mediante el body
#La fechas y el numero de pedido se genera automaticamente */
exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        let mensaje = ''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        })
        res.send(mensaje)

    }
    else {
        const { idmesero, estacion, Estacion, activo, modalidad, estado } = req.body;
        var texto = ''
        try {
            await modeloPedidos.create({
                idmesero: idmesero,
                estacion: estacion,
                Estacion: Estacion,
                activo: activo,
                modalidad: modalidad,
                estado: estado
            }).then((data) => {
                console.log(data);
                texto = "Registro Guardado"
            })
                .catch((err) => {
                    console.log(err);
                    texto = "Error al guardar"
                })
        } catch (error) {
            console.log(error);
            texto = "Error al guardar"
        }
        res.send(texto)
    }
}

/* #Funcion para editar un pedido existente segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido para poder editarlo
#La fecha se actualiza automaticamente */
exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        let mensaje = ''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        })
        res.send(mensaje)

    }
    else {
        const { id } = req.query;
        const { idmesero, fechahora, estacion, Estacion, activo, modalidad, estado } = req.body;
        var texto = ''
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if (buscarPedido) {
                await buscarPedido.update(
                    {
                        ...req.body
                    },
                    {
                        where: {
                            NumeroPedido: id
                        }
                    }
                )
                    .then((data) => {
                        console.log(data);
                        texto = "Registro Actualizado"
                    }).catch((err) => {
                        console.log(err);
                        texto = "Error al actualizar"
                    })
            } else {
                texto = 'No se ha encontrado el registro';
            }
        }
        catch (error) {
            console.log(error);
            texto = "Error al actualizar en la base de datos"
        }
        res.send(texto)

    }
    res.json(msj);
};

/* 
#Funcion que elimina un pedido segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido  para eliminarlo */
exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        let mensaje = ''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        })
        res.send(mensaje)

    }
    else {
        var texto = ''
        const { id } = req.query;
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if (buscarPedido) {
                await buscarPedido.destroy();
                texto = 'Se ha eliminado el registro correctamente';
            } else {
                texto = 'No se ha encontrado el registro';
            }

        } catch (error) {
            console.log(error);
            texto = "Error al actualizar en la base de datos"
        }
        res.send(texto)

    }
    res.json(msj);
};