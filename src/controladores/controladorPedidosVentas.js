const pedidosVentas = require('../modelos/modeloPedidosVentas');
const {validationResult} = require('express-validator');
const db = require('../configuracion/db');
const {QueryTypes, Op} = require('sequelize');
const modelosdetalle = require('../modelos/modeloDetallePedidos');

//const { where } = require('sequelize/types');

exports.Listar = async (req, res) => {
    const pedidos_ventas = await pedidosVentas.findAll();
    res.render("pedidosVentasIndex", {
        titulo: 'Listado de ventas',
        pedidos_ventas})
        console.log(pedidos_ventas);
    }

    exports.Nuevo =  async (req, res) => {
        try { 
            const listarVentas = await modelosdetalle.findAll({
                raw:true
            }); 
            console.log(listarVentas)
            res.render("pedidosVentasGuardar", { 
                titulo: 'Nuevo pedido ventas a guardar', 
                listarVentas
            }); 
        } 
        catch (error) { 
            res.json(error);
        }
    };


    exports.Buscar =  async (req, res) => {
        const filtro = req.query.filtro;
        const buscar = req.query.buscar;
        let lista= [];

        try { 
            if(filtro === undefined || buscar === undefined){
            lista = await pedidosVentas.findAll(); 
           
        } 

        else if (filtro == 'numeroFactura'){
            lista = await pedidosVentas.findAll({
                where:{
                    numeroFactura:{
                        [Op.like]: '%' +buscar+ '%'
                    }
                }
            });
        }
    else{

        lista = await pedidosVentas.findAll({
            where:{
                numeroPedido:{
                    [Op.like]: '%' +buscar+ '%'
                }
            },
        });
    }
    }
        catch (error) { 
            res.json(error);
        }
        res.render("pedidosVentasBuscar", { 
            titulo: 'Buscar pedido ventas', 
            lista
        }); 
    };



   


exports.listarPedidosVentas = async (req, res) => {
    const listarPedidos = await db.query("select * from listapedidosventas",{type:QueryTypes.SELECT}); 
    if(listarPedidos.length==0){
        res.send("No existen datos!!!");
    }
    else{
        res.render("pedidosVentasIndex", {
            titulo: 'Listado de entrega de pedidos',
            listarPedidos})
    console.log(listarPedidos);
    }
};

exports.BuscarId = async (req, res) => {
    try {
        const id = req.query.id;
        const pedido = await pedidosVentas.findOne({
            where: {
                numeroFactura: id
            },
            raw: true,
        });

        const listarVentas = await pedidosVentas.findAll({
            raw:true,
        });

        const detalle = await modelosdetalle.findOne({

            where: {
                NumeroPedido: pedido.numeroPedido
            },
            attributes: ['NumeroPedido'],
            raw: true
        });

        const listarDetalles = await modelosdetalle.findAll({
            raw:true,
        });

        console.log(detalle);
        res.render("pedidosVentasBuscarId", {
            titulo: 'Editar pedido ventas',
            pedido, listarVentas, detalle,listarDetalles
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
        const {numeroPedido} = req.body;
        var texto=''
        try {
            await pedidosVentas.create({
                //idRegistro,
                numeroPedido
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
            var buscarVentas = await pedidosVentas.findOne(
                {
                    where: {
                        numeroFactura: id
                    }
                }
            )
            if(buscarVentas){
                await pedidosVentas.update(
                    {
                        ...req.body                        
                    },
                    {
                        where: {
                            numeroFactura: id
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
        const {id} = req.query;
        var texto="";
        try {
            var buscarPedido = await pedidosVentas.findOne({
                where:{
                    numeroFactura:id
                }
            });
            if(!buscarPedido){
                texto="Este registro no existe"
            }
            else{
                await pedidosVentas.destroy({where:{numeroFactura:id}})
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