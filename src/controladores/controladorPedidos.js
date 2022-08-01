const { validationResult } = require('express-validator');
const modeloPedidos = require('../modelos/modeloPedidos');
const modeloMeseros = require('../modelos/modeloMeseros');
const modeloEstaciones = require('../modelos/modeloEstaciones');
const modeloMesas_x_area = require('../modelos/modeloMesas_x_area');
const { Op } = require('sequelize');
const db = require('../configuracion/db');

//Funcion para obtener todos los pedidos de la tabla
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    try {
        const lista = await modeloPedidos.findAll({       
                order: [
                    ['NumeroPedido', 'ASC']
                ],
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
            if (estado[0] == 'S') {
                element.elaborado = 'checked';
            }
            else {
                element.elaborado = '';
            }
            if (estado[1] == 'S') {
                element.entregado = 'checked';
            }
            else {
                element.entregado = '';
            }
            if (estado[2] == 'S') {
                element.facturado = 'checked';
            }
            else {
                element.facturado = '';
            }
            // isset($pedido['activo'])? 'Activo':'Inactivo';
            element.activo = element.activo == '1' ? 'Pendiente' : 'Finalizado';
            if (element.modalidad == 'DO') {
                element.modalidad = 'Domicilio';
            }
            else if (element.modalidad == 'ME') {
                element.modalidad = 'Mesa';
            }
            else {
                element.modalidad = 'Llevar';
            }
        });
        //console.log(lista);
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
        const listaMesas = await modeloMesas_x_area.findAll({
            //logging: console.log,
            raw: true
        });
        //console.log(listaMesas);
        //console.log(window.location.href)
        res.render("pedidosNuevo", {
            titulo: 'Nuevo pedido',
            listaMeseros,
            listaEstaciones,
            listaMesas,
            //listarClientes
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

exports.BuscarId = async (req, res) => {
    try {
        const id = req.query.id;
        const pedido = await modeloPedidos.findOne({
            where: {
                NumeroPedido: id
            },
            raw: true,
        });
        //foreach pedido.estado
        const nombreestacion = await modeloEstaciones.findOne({
            where: {
                idestacion: pedido.Estacion
            },
            attributes: ['nombre'],
            raw: true
        });
        const nombremesero = await modeloMeseros.findOne({
            where: {
                idmesero: pedido.idmesero
            },
            attributes: ['nombre'],
            raw: true
        });
        const listaMeseros = await modeloMeseros.findAll({
            raw: true
        });
        const listaEstaciones = await modeloEstaciones.findAll({
            raw: true
        });
        const listaMesas = await modeloMesas_x_area.findAll({
            //logging: console.log,
            raw: true
        });
        //console.log(listaMesas);
        //console.log("id"+id)
        //console.log(pedido)
        //console.log(nombreestacion)
        //console.log(window.location.href)
        res.render("pedidosBuscarId", {
            titulo: 'Editar pedido',
            pedido,
            listaMeseros,
            listaEstaciones,
            listaMesas,
            nombreestacion,
            nombremesero
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
    //filter: mesero, numeropedido, estacion
    const filtro = req.query.filtro;
    const buscar = req.query.buscar;
    //console.log("Buscar "+req.query.buscar);
    //console.log("Filtro "+req.query.filtro);   
    let modeloABuscar = (filtro == 'mesero') ? modeloMeseros : (filtro == 'estacion') ? modeloEstaciones : modeloPedidos;
    let campoABuscar = (filtro == 'mesero') ? 'nombre' : (filtro == 'estacion') ? 'nombre' : 'NumeroPedido'
    let modeloAIncluir = (filtro == 'mesero') ? modeloEstaciones : (filtro == 'estacion') ? modeloMeseros : ''
    
    console.log('Modelo a Buscar ' + modeloABuscar)
    console.log('Campo a Buscar ' + campoABuscar)
    let lista=[]
    if(filtro === undefined || buscar === undefined){
        
        lista = await modeloPedidos.findAll({
            order: [
                ['NumeroPedido', 'ASC']
            ],
            include: [{
                model: modeloMeseros,
            }, {
                model: modeloEstaciones,
            }],
            raw: true 
        });
    }
    else{
        try {        
            if(campoABuscar != 'NumeroPedido'){
                lista = await modeloPedidos.findAll({
                    order: [
                        ['NumeroPedido', 'ASC']
                    ],
                    include: [{
                        model: modeloABuscar,
                        where: {
                            [campoABuscar]: {
                                [Op.like]: '%' + buscar + '%'
                            }
                        },
                        attributes: [campoABuscar]
                    }, {
                        model: modeloAIncluir,
                        attributes: [campoABuscar]
                    }],
                    raw: true 
                });
            }
            else{
                lista = await modeloPedidos.findAll({
                    where: {
                        [filtro]: {
                            [Op.like]: '%' + buscar + '%'
                        }
                    },
                    order: [
                        ['NumeroPedido', 'ASC']
                    ],
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
            }
            
        }
        catch (error) {
            console.log(error);
        }
    }
    
        
        if(lista.length > 0){
         lista.forEach(element => {
            const estado = element.estado;
            estado[0] == 'S' ? (element.facturado = 'checked') : (element.facturado = '');
            estado[1] == 'S' ? (element.entregado = 'checked') : (element.entregado = '');
            estado[2] == 'S' ? (element.elaborado= 'checked') : (element.elaborado = '');
            // isset($pedido['activo'])? 'Activo':'Inactivo';
            element.activo = element.activo == '1' ? 'Pendiente' : 'Finalizado';
            if (element.modalidad == 'DO') {
                element.modalidad = 'Domicilio';
            }
            else if (element.modalidad == 'ME') {
                element.modalidad = 'Mesa';
            }
            else {
                element.modalidad = 'Llevar';
            }
        }) 
        } 
        else {
            console.log('No hay resultados');
        }
        
        res.render("pedidosBuscar", {
            titulo: 'Buscar pedido',
            lista
        });
        


        
    /* try {
        let lista;
        if (filtro == 'mesero') {
            lista = await modeloPedidos.findAll({
                order: [
                    ['NumeroPedido', 'ASC']
                ],
                include: [{
                    model: modeloMeseros,
                    where: {
                        nombre: {
                            [Op.like]: '%' + buscar + '%'
                        }
                    },
                    attributes: ['nombre']
                }, {
                    model: modeloEstaciones,
                    attributes: ['nombre']
                }],
                //logging: console.log,
                raw: true 
            });
        }else if (filtro == 'estacion') {
            lista = await modeloPedidos.findAll({
                order: [
                    ['NumeroPedido', 'ASC']
                ],
                include: [{
                    model: modeloMeseros,
                    attributes: ['nombre']
                }, {
                    model: modeloEstaciones,
                    where: {
                        nombre: {
                            [Op.like]: '%' + buscar + '%'
                        }
                    },
                    attributes: ['nombre']
                }],
                //logging: console.log,
                raw: true 
            });
        }else{
            lista = await modeloPedidos.findAll({
                where: {
                    [filtro]: {
                        [Op.like]: '%' + buscar + '%'
                    }
                },
                order: [
                    ['NumeroPedido', 'ASC']
                ],
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
        }
        //console.log(lista);
        res.render("pedidosBuscar", {
            titulo: 'Buscar pedido',
            lista
        });
    }
    catch (error) {
        console.log(error);
        res.render("pedidosbuscar", {
            titulo: String(error),
        });
    } */
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
            if (estado[0] == 'S') {
                element.elaborado = 'checked';
            }
            else {
                element.elaborado = '';
            }
            if (estado[1] == 'S') {
                element.entregado = 'checked';
            }
            else {
                element.entregado = '';
            }
            if (estado[2] == 'S') {
                element.facturado = 'checked';
            }
            else {
                element.facturado = '';
            }
            // isset($pedido['activo'])? 'Activo':'Inactivo';
            element.activo = element.activo == '1' ? 'Pendiente' : 'Finalizado';
            if (element.modalidad == 'DO') {
                element.modalidad = 'Domicilio';
            }
            else if (element.modalidad == 'ME') {
                element.modalidad = 'Mesa';
            }
            else {
                element.modalidad = 'Llevar';
            }
        });
        //console.log(lista);
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
    console.log(req.body);
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        let mensaje = ''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        })
        res.send(mensaje)

    }
    else {
        const { idmesero, Estacion, activo, modalidad, estado } = req.body;
        var texto = ''
        try {
            await modeloPedidos.create({
                idmesero: idmesero,
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
    console.log("Holakk")
    console.log(req.body);
    if (validacion.errors.length > 0) {
        let mensaje = ''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        })
        res.send(mensaje)

    }
    else {
        const { id } = req.query;
        console.log("Numero" + id);
        var texto = ''
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            console.log(buscarPedido);
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