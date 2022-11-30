const {validationResult} = require('express-validator');
//se usa el modelo creado, lo llamamos dentro de una variable
const modelousuarios = require('../modelos/modelousuarios');
const {Op} = require('sequelize');


//en el controlador se crean las funciones (CRUD)

exports.Listar = async(req, res) => {
        const lista = await usuarios.findAll();//con el findall le indicamos que busque todos los datos
        console.log(lista);
        
        res.render("usuarios",{
            titulo: 'Listado de Usuarios',
            lista});
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
        const { idregistro, LoginUsuarios, Contraseña, AccesoTotal, Habilitado, pin, Fallidos, correo, estado} = req.body;
        var texto=''
        try {
            await usuarios.create({
                idregistro,
                LoginUsuarios,
                Contraseña,
                AccesoTotal, 
                Habilitado,
                pin,
                Fallidos,
                correo,
                estado
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
            var buscardetalle = await modelousuarios.findOne(
                {
                    where: {
                        idregistro: id
                    }
                }
            )
            if(buscardetalle){
                await buscardetalle.update(
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
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(error => {
            msj.mensaje += error.msg + '. ';
        });
    }else{
        const {id} = req.query;
        try { 
            var buscardetalle = await modelousuarios.findOne({
                where: {
                    iddetallepedido: id
                }
            });       
            if(!buscardetalle){
                msj.mensaje = 'No se ha encontrado un detalle pedido con el ID ' + id;
            }
            else{
                await buscardetalle.destroy({
                    where: {
                        idregistro: id
                    }
                });
                msj.mensaje = 'ID Registro eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al borrar el detalle pedido';
        }
    }
    res.json(msj.mensaje);

}