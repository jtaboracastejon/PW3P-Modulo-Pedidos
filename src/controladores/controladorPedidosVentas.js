const pedidosVentas = require('../modelos/modeloPedidosVentas');
const {validationResult} = require('express-validator');
const db = require('../configuracion/db');
const {QueryTypes} = require('sequelize');
//const productos = require('../modelos/modeloProductos');
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
        try { 
            const pedidos_ventas = await pedidosVentas.findAll(); 
            res.render("pedidosVentasBuscar", { 
                titulo: 'Buscar pedido ventas', 
                pedidos_ventas
            }); 
            console.log(pedidos_ventas);
        } 
        catch (error) { 
            res.json(error);
        }
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
        const { numeroFactura } = req.query;
        
        var texto=''
        try {
            var buscarVentas = await pedidosVentas.findOne(
                {
                    where: {
                        numeroFactura: numeroFactura
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
                            numeroFactura: numeroFactura
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
        const {numeroFactura} = req.query;
        var texto="";
        try {
            var buscarPedido = await pedidosVentas.findOne({
                where:{
                    numeroFactura:numeroFactura
                }
            });
            if(!buscarPedido){
                texto="Este registro no existe"
            }
            else{
                await pedidosVentas.destroy({where:{numeroFactura:numeroFactura}})
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