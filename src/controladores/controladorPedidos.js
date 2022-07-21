const { validationResult } = require('express-validator');
const modeloPedidos = require('../modelos/modeloPedidos');

//Funcion para obtener todos los pedidos de la tabla
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    try {
        const lista = await modeloPedidos.findAll();
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
};

/* #Funcion para guardar un nuevo pedido que recibe mediante el body
#La fechas y el numero de pedido se genera automaticamente */
exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }
    else{
        const { idmesero, estacion, Estacion, activo, modalidad, estado } = req.body;
        var texto=''
        try {
            await modeloPedidos.create({
                idmesero: idmesero,
                estacion: estacion,
                Estacion: Estacion,
                activo: activo,
                modalidad: modalidad,
                estado: estado
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
   
/* #Funcion para editar un pedido existente segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido para poder editarlo
#La fecha se actualiza automaticamente */
exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }
    else{
        const { id } = req.query;        
        const { idmesero, fechahora, estacion, Estacion, activo, modalidad, estado } = req.body;
        var texto=''
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if(buscarPedido){
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
                    texto="Registro Actualizado"
                }).catch((err) => {
                    console.log(err);
                    texto="Error al actualizar"
                } )
            }else{
                texto = 'No se ha encontrado el registro';
            }            
        } 
        catch (error) {
            console.log(error);
            texto="Error al actualizar en la base de datos"
        }
        res.send(texto) 
            
    }
    res.json(msj);
};

/* 
#Funcion que elimina un pedido segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido  para eliminarlo */
exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length > 0) {
        let mensaje=''
        validacion.errors.forEach(error => {
            mensaje += error.msg + '. '
        } )
        res.send(mensaje)

    }
    else{
        var texto=''
        const { id } = req.query;
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });            
            if(buscarPedido){
                await buscarPedido.destroy();
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
    res.json(msj);
};