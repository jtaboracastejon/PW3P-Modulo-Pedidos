const pedidosLlevar = require('../modelos/modeloPedidosLlevar');
const {validationResult} = require('express-validator');
const db = require('../configuracion/db');
const {QueryTypes} = require('sequelize');
const modelocliente = require('../modelos/modeloCliente');
const modeloPedido = require('../modelos/modeloPedidos');
//const { where } = require('sequelize/types');

exports.Listar = async (req, res) => {
    const pedidos_llevar = await pedidosLlevar.findAll({
        include:[{
            model: modelocliente,
            attributes: ['nombre']
        }],
        logging:console.log,
        raw:true
    });
    res.render("pedidosLlevarIndex", {
        titulo: 'Listado de entrega de pedidos',
        pedidos_llevar})
        console.log(pedidosLlevar);
    };


exports.Nuevo =  async (req, res) => {
        try { 
            const listarClientes = await modelocliente.findAll({
                raw: true});
            const listarDetalles = await modeloPedido.findAll({
                    raw: true});

                console.log(listarClientes)
                console.log(listarDetalles)
                res.render("pedidosLlevarGuardar", { 
                titulo: 'Nuevo pedido a guardar', listarClientes, listarDetalles}); 
        } 
        catch (error) {
            console.log(error);
            res.render("error",{
            titulo:'error',
            error
            });
        }
};

exports.BuscarId = async (req, res) => {
    try {
        const id = req.query.id;
        const pedido = await pedidosLlevar.findOne({
            where: {
                idRegistro: id
            },
            raw: true,
        });
        const cliente = await modelocliente.findOne({

            where: {
                idcliente: pedido.idCliente
            },
            attributes: ['nombre'],
            raw: true
        });

        const detalle = await modeloPedido.findOne({

            where: {
                NumeroPedido: pedido.idPedido
            },
            attributes: ['NumeroPedido'],
            raw: true
        });

        const listarDetalles = await modeloPedido.findAll({
            raw:true,
        });
        const listarClientes = await modelocliente.findAll({
            raw:true,
        });


        console.log(detalle);
        res.render("pedidosLlevarBuscarId", {
            titulo: 'Editar pedido',
            pedido, cliente, detalle, listarClientes, listarDetalles
        });
    }
    catch (error) {
        console.log(error);
        res.render("error", {
            titulo: 'error',
            error
        });
    }
};


    exports.Buscar =  async (req, res) => {
        try { 
            const pedidos_llevar = await pedidosLlevar.findAll({
                include:[{
                    model: modelocliente,
                    attributes: ['nombre']
                }],
                logging:console.log,
                raw:true
            }); 
            res.render("pedidosLlevarBuscar", { 
                titulo: 'Buscar pedido a llevar', 
                pedidos_llevar
            }); 
        } 
        catch (error) { 
            res.json(error);
        }
    };
    

exports.listarPedidos = async (req, res) => {
    const listarpedidos = await db.query("select * from listarpedidosllevar",{type:QueryTypes.SELECT}); 
    if(listarpedidos.length==0){
        res.send("No existen datos!!!");
    }
    else{
        res.render("pedidosLlevarIndex", {
            titulo: 'Listado de pedidos llevar',
            listarpedidos})
    console.log(listarpedidos);
    }
};

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }else{
        //const { idRegistro} = req.query;
        const { idPedido, idCliente } = req.body;
        var texto=''
        try {
            await pedidosLlevar.create({
                //idRegistro,
                idPedido,
                idCliente
            }).then((data) => {
                console.log(data);
                texto="Pedido Guardado!!"
            })
            .catch((err) => {
                console.log(err);
                texto="Error al guardar!!"
            } )
        } catch (error) {
            console.log(error);
            texto="Error al guardar!!"
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
        
        var texto=''
        try {
            var buscarPedido = await pedidosLlevar.findOne(
                {
                    where: {
                        idRegistro: id
                    }
                }
            )
            if(buscarPedido){
                await pedidosLlevar.update(
                    {
                        ...req.body                        
                    },
                    {
                        where: {
                            idRegistro: id
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
    if(validacion.errors.length>0){
        let mensaje='';
        validacion.errors.forEach(Element =>{
            console.log(Element);
            mensaje+=Element.msg + ', ';
        });
        res.send(mensaje);
        }
    else{
        const {idRegistro} = req.query;
        var texto="";
        try {
            var buscarPedido = await pedidosLlevar.findOne({
                where:{
                    idRegistro:idRegistro
                }
            });
            if(!buscarPedido){
                texto="Este registro no existe"
            }
            else{
                await pedidosLlevar.destroy({where:{idRegistro:idRegistro}})
                .then((data) => {
                    console.log(data);
                    texto="Pedido eliminado!!"
                })
                .catch((err) => {
                    console.log(err);
                    texto="Error al eliminar el pedido!!"
                });
            }

        } catch (error) {
            console.log(error);
            texto="Error al eliminar de la base de datos"
        }
        res.send(texto)        
    } 
}