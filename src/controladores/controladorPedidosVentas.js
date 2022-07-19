const pedidosVentas = require('../modelos/modeloPedidosVentas');
const {validationResult} = require('express-validator');
//const { where } = require('sequelize/types');

exports.Listar = async (req, res) => {
    const pedidos_ventas = await pedidosVentas.findAll();
    res.json(pedidos_ventas);
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