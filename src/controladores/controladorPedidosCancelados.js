const Pedidos_Cancelados = require('../modelos/modeloPedidosCancelados');
const {validationResult} = require('express-validator');
const {QueryTypes, Op} = require('sequelize');
const modelousuario = require('../modelos/modelousurio');
const modelopedidosdetalle = require("../modelos/modeloDetallePedidos");

exports.Listar = async (req, res) => {
    const pedidos_cancelados = await Pedidos_Cancelados.findAll({
        include:[{
            model: modelousuario,
            attributes: ['LoginUsuario']
        }],
        raw: true
    });
    console.log(pedidos_cancelados);

    res.render("pedidos_canceladosindex",{
    titulo:"listado de pedidos cancelados",
    pedidos_cancelados});
}


exports.nuevo = async (req, res) =>{
    const modelopedidosdetallee = await modelopedidosdetalle.findAll({
        raw:true
    });
    const modelousuarioo = await modelousuario.findAll({
        raw:true
    });//con el findall le indicamos que busque todos los datos
    
    res.render("pedidos_canceladosnuevo", {
        titulo: 'Nuevo pedidos cancelados',
        modelousuarioo,
        modelopedidosdetallee

    });
}

exports.buscar = async (req, res) =>{
    const filtro = req.query.filtro;
    const buscar = req.query.buscar;
    let lista=[];
    try {
        if(filtro === undefined || buscar === undefined){
            lista=await Pedidos_Cancelados.findAll({
                include:[{
                    model: modelousuario,
                    attributes: ['LoginUsuario']
                }],
                raw: true
            });
        }
        else if(filtro=='id'){
            lista=await Pedidos_Cancelados.findAll({
                where:{
                    id:{
                        [Op.like]: '%'+buscar+'%'
                    }
                },
                include:[{
                    model: modelousuario,
                    attributes: ['LoginUsuario']
                }],
                raw: true
            });
        }
        else{
            lista=await Pedidos_Cancelados.findAll({
                include:[{
                    model: modelousuario,
                    where:{
                        LoginUsuario:{
                            [Op.like]: '%'+buscar+'%'
                        }
                    },
                    attributes: ['LoginUsuario']
                }],
                raw:true   
            });
        }
        
    } catch (error) {
        res.json(error);
    }
    
    res.render("pedidos_canceladosbuscar", {
        titulo: 'Buscar pedidos cancelados',
        lista

    });
}

exports.BuscarId = async (req, res) =>{
    try{
        const id = req.query.id;
        const pedidos_cancelados = await Pedidos_Cancelados.findOne({
            where:{
                id:id
            },
            raw: true,
        });

        const pedidosdetalle = await modelopedidosdetalle.findAll({
            raw:true
        });

        const usuario = await modelousuario.findOne({
            where:{
               idregistro:pedidos_cancelados.idusuario
            },
            attributes:['LoginUsuario'],
            raw:true
        });

        const usuarios = await modelousuario.findAll({
            raw:true
        });

        res.render("pedidos_canceladosBuscarId",{
            titulo: 'Editar pedido Cancelado',
            pedidosdetalle,
            usuario,
            pedidos_cancelados,
            usuarios
        });

        
        
    }
    catch(error){
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
}



exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }else{
        const { id, idusuario, fechahora } = req.body;
        var texto=''
        try {
            await Pedidos_Cancelados.create({
                id,
                idusuario,
                fechahora
            }).then((data) => {
                console.log(data);
                texto="Registro Guardado"
            })
            .catch((err) => {
                console.log(err);
                texto="Error al guardar"
            } )
        } catch (error) {
            console.log(error);
            texto="Error al guardar"
        }
        res.send(texto)        
    }    
}
exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }else{
        const { id } = req.query;
        console.log(req.body)
        console.log("hola")
        var texto=''
        try {
            var buscarPedidos_Cancelados = await Pedidos_Cancelados.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )
            if(buscarPedidos_Cancelados){
                await Pedidos_Cancelados.update(
                    {
                        ...req.body                        
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                )
                .then((data) => {
                    console.log(data);
                    texto="Registro Actualizado"
                }).catch((err) => {
                    console.log(err);
                    texto="Error al actualizar"
                } )  
            }else{
                texto="No existe el registro"
            }
        } catch (error) {
            console.log(error);
            texto="Error al actualizar en la base de datos"
        }
        res.send(texto)        
    } 
}
exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }else{
        const { id } = req.query;
        
        var texto=''
        try {
            var buscarPedidos_Cancelados = await Pedidos_Cancelados.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )
            if(buscarPedidos_Cancelados){
                await Pedidos_Cancelados.destroy(
                    {
                        where: {
                            id: id
                        }
                    }
                )
                .then((data) => {
                    console.log(data);
                    texto="Registro Eliminado"
                }).catch((err) => {
                    console.log(err);
                    texto="Error al eliminar los datos"
                } )  
            }else{
                texto="No existe el registro"
            }
        } catch (error) {
            console.log(error);
            texto="Error al eliminar los datos en la base de datos"
        }
        res.send(texto)        
    }
}