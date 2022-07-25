const Pedidos_mesa = require('../modelos/modeloPedidos_mesa');
const {validationResult} = require('express-validator');
const { text } = require('express');
const modelosMesa = require('../modelos/modeloMesas_x_area');
const { transformAuthInfo } = require('passport');


exports.Listar = async(req, res) => {
    //const pedidos_mesa = await Pedidos_mesa.findAll();
    const pedidos_mesa = await Pedidos_mesa.findAll({
        include: {
            model: modelosMesa,
            attributes: ['Mesa'],
        },
        raw: true,
    });
    console.log(pedidos_mesa);
    //res.json(pedidos_mesa);
    //console.log(pedidos_mesa);

    res.render("Pedidos_mesaIndex", {
        titulo: 'Listado de Pedidos_mesa',
        pedidos_mesa
    });
}

exports.nuevo = async (req, res) =>{
    const pedidos_mesa = await Pedidos_mesa.findAll({

    });//con el findall le indicamos que busque todos los datos
    console.log(Pedidos_mesa);
    
    res.render("Pedidos_mesaNuevo", {
        titulo: 'Nuevo en Pedidos_mesa',
        Pedidos_mesa

    });
}

exports.buscar = async (req, res) =>{
    const pedidos_mesa = await Pedidos_mesa.findAll({

    });//con el findall le indicamos que busque todos los datos
    console.log(Pedidos_mesa);
    
    res.render("Pedidos_mesaBuscar", {
        titulo: 'Buscar en Pedidos_mesa',
        Pedidos_mesa

    });
}


exports.Guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(validacion.errors.length>0){
        let mensaje='';
        validacion.errors.forEach(element => {
            console.log(element);
            mensaje+=element.msg + '. ';
        });
        res.send(mensaje);
    }
    else{
        const {idregistro,idpedido,idmesa, cuenta, nombrecuenta} = req.body;
    var texto = ''
    try {
        await Pedidos_mesa.create({
            idpedido,
            idmesa,
            cuenta,
            nombrecuenta
        }).then((data) => {
            console.log(data);
            texto = "Pedido Guardado";
        })
        .catch((err) => {
            console.log(err);
            texto="Error al guardar";
        })
        
    } catch (error) {
        console.log(error);
        texto= "Error al guardar";      
    }
    res.send(texto);
    }
}

exports.Modificar = async (req,res) =>{
    const validacion = validationResult(req);
   if(validacion.errors.length>0){
    let mensaje='';
    validacion.errors.forEach(element => {
        console.log(element);
        mensaje+=element.msg + '. ';
    });
    res.send(mensaje);
   }
   else{
    const {idregistro} = req.query;
    try {
        var buscarPedidos_mesa = await Pedidos_mesa.findOne({
            where: {
                idregistro: idregistro
            }
        });
        if(buscarPedidos_mesa){
            await Pedidos_mesa.update(
                {
                    ...req.body
                },
                {
                    where:{
                        idregistro: idregistro
                    }
                }
            )
            .then((data) => {
                console.log(data);
                texto = "Pedido Modificado";
            })
            .catch((err) => {
                console.log(err);
                texto="Error al modificar";
            })
        }
        else{
            texto = "No se ha encontrado el pedido mesa";
        }
    } catch (error) {
        console.log(error);
        texto="Error al modificar en la base de datos"
    }
    res.send(texto);

   }
}

exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);
    if(validacion.errors.length>0){
        let mensaje='';
        validacion.errors.forEach(element => {
        console.log(element);
        mensaje+=element.msg + '. ';
    });
    res.send(mensaje);
    }
    else{
        //texto="";
        const {idregistro} = req.query;
    try {
        
        var buscarPedidos_mesa =  await  Pedidos_mesa.findOne({
            where: {
                idregistro: idregistro
            }
        });
        if(buscarPedidos_mesa){
            await Pedidos_mesa.destroy({
                where : 
                {   idregistro:idregistro
                }
                })
                .then((data) => {
                    console.log(data);
                    texto="Registro Eliminado";
                }).catch((err) => {
                    console.log(err);
                    texto="Error al eliminar";
                }); 
        }
        else{
            texto = "No se ha encontrado el registro del pedido" 
        }
            
    } catch (error) {
        console.log(error);
        texto="Error al actualizar en la base de datos";
    }
    res.send(texto);
    }
}