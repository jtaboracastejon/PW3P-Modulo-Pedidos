const Cargo = require('../modelos/modelocargo');
const {validationResult} = require('express-validator');

exports.Listar = async (req, res) => {
    const cargos = await Cargo.findAll();
    res.render("cargosIndex", {
        titulo: 'Listado de Cargos',
        cargos})
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
        const { nombre, descripcion } = req.body;
        var texto=''
        try {
            await Cargo.create({
                nombre,
                descripcion
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
            var buscarCargo = await Cargo.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )
            if(buscarCargo){
                await Cargo.update(
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
    try {
        
    } catch (error) {
        
    }
}