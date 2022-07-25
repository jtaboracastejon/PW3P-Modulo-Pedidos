const pedidosLlevar = require('../modelos/modeloPedidosLlevar');
const {validationResult} = require('express-validator');
const db = require('../configuracion/db');
const {QueryTypes} = require('sequelize');
//const { where } = require('sequelize/types');

exports.Listar = async (req, res) => {
    const pedidos_llevar = await pedidosLlevar.findAll();
    res.json(pedidos_llevar);
}

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
        const { idRegistro } = req.query;
        
        var texto=''
        try {
            var buscarPedido = await pedidosLlevar.findOne(
                {
                    where: {
                        idRegistro: idRegistro
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
                            idRegistro: idRegistro
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