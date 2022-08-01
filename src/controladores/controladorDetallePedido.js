
const modeloDetallePedidos = require('../modelos/modeloDetallePedidos');
const modeloPedidos = require('../modelos/modeloPedidos');
const {validationResult} = require('express-validator');


exports.Listar = async (req, res) => {
    try {
        const lista = await modeloDetallePedidos.findAll({
            order: [
                ['idregistro', 'ASC']
            ],
            raw: true
        });
        res.render("detallepedidoIndex",{
        titulo: "Lista de Detalle Pedidos",
        lista})
    } catch (error) {
        console.error(error);        
        res.render("detallepedidoIndex",{
        titulo: "Lista de Detalle Pedidos",
        })
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
        var texto=''
        const {NumeroPedidos, CodigoProducto, Cantidad, Notas, subproducto, Cancelado,Elaborado,Entregado,Facturado} = req.body;
        try {
            await modeloDetallePedidos.create({
                NumeroPedidos,
                CodigoProducto,
                Cantidad,
                Notas,
                subproducto,
                Cancelado,
                Elaborado,
                Entregado,
                Facturado
                
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

exports.GuardarBulk = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }else {
        const DetallePedido = req.body;
        var texto=''
        try {
            await modeloDetallePedidos.bulkCreate(
                DetallePedido
            ).then((data) => {
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
};

exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }else{
        const {idregistro} = req.query;
        var texto=''
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                await buscarDetallePedido.update(
                    {
                        ...req.body                        
                    },
                    {
                        where: {
                            idregistro: idregistro
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
                texto = 'No se ha encontrado el registro';
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
        var texto=''
        const {idregistro} = req.query;
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                await buscarDetallePedido.destroy();
                texto = 'Se ha eliminado el registro correctamente';
            }else{
                texto= 'No se ha encontrado el registro';
            }

        } catch (error) {
            console.log(error);
            texto="Error al actualizar en la base de datos"
        }
        res.send(texto) 
    }
}