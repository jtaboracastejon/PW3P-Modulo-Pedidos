const entregaPedidos = require('../modelos/modeloEntregaPedidos');
const {validationResult} = require('express-validator');
//const { where } = require('sequelize/types');

exports.Listar = async (req, res) => {
    const entrega_pedidos = await entregaPedidos.findAll();
    res.json(entrega_pedidos);
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
        const { idDetalle, usuario, fechahora, identrega } = req.body;
        var texto=''
        try {
            await entregaPedidos.create({
                idDetalle,
                usuario,
                fechahora,
                identrega
                
            }).then((data) => {
                console.log(data);
                texto="Entrega de pedido guardada!!"
            })
            .catch((err) => {
                console.log(err);
                texto="Error al guardar la entrega!!"
            } )
        } catch (error) {
            console.log(error);
            texto="Error al guardar la entrega!!"
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
        const { idDetalle } = req.query;
        
        var texto=''
        try {
            var buscarPedido = await entregaPedidos.findOne(
                {
                    where: {
                        idDetalle: idDetalle
                    }
                }
            )
            if(entregaPedidos){
                await entregaPedidos.update(
                    {
                        ...req.body                        
                    },
                    {
                        where: {
                            idDetalle: idDetalle
                        }
                    }
                )
                .then((data) => {
                    console.log(data);
                    texto="Entrega  Actualizada"
                }).catch((err) => {
                    console.log(err);
                    texto="Error al actualizar la entrega"
                } )  
            }else{
                texto="No existe el registro de entrega"
            }
        } catch (error) {
            console.log(error);
            texto="Error al actualizar la entrega"
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
        const {idDetalle} = req.query;
        var texto="";
        try {
            var buscarPedido = await entregaPedidos.findOne({
                where:{
                    idDetalle:idDetalle
                }
            });
            if(!buscarPedido){
                texto="Este registro de entrega no existe"
            }
            else{
                await entregaPedidos.destroy({where:{idDetalle:idDetalle}})
                .then((data) => {
                    console.log(data);
                    texto="entrega eliminada!!"
                })
                .catch((err) => {
                    console.log(err);
                    texto="Error al eliminar la entrega!!"
                });
            }

        } catch (error) {
            console.log(error);
            texto="Error al eliminar de la base de datos"
        }
        res.send(texto)        
    } 
}