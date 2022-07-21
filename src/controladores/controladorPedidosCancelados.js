const Pedidos_Cancelados = require('../modelos/modeloPedidosCancelados');
const {validationResult} = require('express-validator');

exports.Listar = async (req, res) => {
    const pedidos_cancelados = await Pedidos_Cancelados.findAll();
    res.json(pedidos_cancelados);
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
        const { id, usuario, fechahora } = req.body;
        var texto=''
        try {
            await Pedidos_Cancelados.create({
                id,
                usuario,
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