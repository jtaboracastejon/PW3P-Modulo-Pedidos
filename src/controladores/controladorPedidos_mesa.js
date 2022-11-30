const Pedidos_mesa = require('../modelos/modeloPedidos_mesa');
const {validationResult} = require('express-validator');
const { text } = require('express');
const modelosMesa = require('../modelos/modeloMesas_x_area');
const modeloPedido = require('../modelos/modeloPedidos');
const {QueryTypes, Op} = require('sequelize');
const modeloPedidos = require('../modelos/modeloPedidos');

//const { transformAuthInfo } = require('passport');


exports.Listar = async(req, res) => {
    //const pedidos_mesa = await Pedidos_mesa.findAll();
    const pedidos_mesa = await Pedidos_mesa.findAll({
        order: [
            ['idregistro', 'ASC']
        ],
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
    
        raw: true,

    });//con el findall le indicamos que busque todos los datos
    
    const mesas_x_area = await modelosMesa.findAll({
        raw:true,
    });
    
    const pedidos = await modeloPedido.findAll({
        raw:true,
    });
    
    console.log(pedidos_mesa);
    console.log(mesas_x_area);
    
    res.render("Pedidos_mesaNuevo", {
        titulo: 'Nuevo en Pedidos_mesa',
        pedidos_mesa,
        mesas_x_area,
        pedidos

    });

    
}


/*
exports.buscar = async (req, res) =>{
    const pedidos_mesa = await Pedidos_mesa.findAll({

    });//con el findall le indicamos que busque todos los datos
    console.log(Pedidos_mesa);
    
    res.render("Pedidos_mesaBuscar", {
        titulo: 'Buscar en Pedidos_mesa',
        Pedidos_mesa

    });
}
*/




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
    //const {idregistro} = req.query;
    const {id} = req.query;
    try {
        var buscarPedidos_mesa = await Pedidos_mesa.findOne({
            where: {
                idregistro: id
            }
        });
        if(buscarPedidos_mesa){
            await Pedidos_mesa.update(
                {
                    ...req.body
                },
                {
                    where:{
                        idregistro: id
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
        const {id} = req.query;         /*idregistro*/ 
    try {
        
        var buscarPedidos_mesa =  await  Pedidos_mesa.findOne({
            where: {
                idregistro: id /*idregistro*/ 
            }
        });
        if(!buscarPedidos_mesa){

                texto = "No se ha encontrado el registro del pedido" 
        }
        else{
            await Pedidos_mesa.destroy({
                where : 
                {   idregistro:id   /*idregistro */
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
    } catch (error) {
        console.log(error);
        texto="Error al actualizar en la base de datos";
    }
    res.send(texto);
    }
}


exports.BuscarId = async (req, res)=>{
    try{
        const id = req.query.id;
        const pedidos_mesa = await Pedidos_mesa.findOne({
            
            where:{
                idregistro: id
            },
            include: [{
                model: modelosMesa,
                attributes: ['Mesa']
            }],
            raw: true,
    
        });//con el findall le indicamos que busque todos los datos
    
        const pedidos = await modeloPedido.findAll({
            raw:true,
        });

        const mesas_x_area = await modelosMesa.findAll({
            raw:true,
        });

        const mesas = await modelosMesa.findOne({
            
            where:{
                idregistro: pedidos_mesa.idmesa

            },

            raw:true,
        });
        
        //console.log(pedidos_mesa);
        //console.log(mesas_x_area);
        console.log(pedidos_mesa);

        
        res.render("Pedidos_mesaBuscarId", {
            titulo: 'Nuevo en Pedidos_mesa',
            pedidos_mesa,
            pedidos,
            mesas,
            mesas_x_area
    
        });
    }
    catch(error){
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
}

exports.buscar = async (req, res) => {
    const filtro = req.query.filtro;
    const buscar = req.query.buscar;
    let lista=[];
    try {
        if(filtro === undefined || buscar === undefined){
            lista = await Pedidos_mesa.findAll({
                order: [
                    ['idregistro', 'ASC']
                ],
                include: {
                    model: modelosMesa,
                    attributes: ['Mesa']
                },
            raw: true,
            });//con el findall le indicamos que busque todos los datos
            //console.log(lista);
        }

        else if(filtro =='idregistro'){
            lista = await Pedidos_mesa.findAll({
                order: [
                    ['idregistro', 'ASC']
                ],
                where: {
                    idregistro: {
                        [Op.like]: '%'+buscar+'%'
                    }
                },
                include: {
                    model: modelosMesa,
                    attributes: ['Mesa']
                },
            raw: true,
            });//con el findall le indicamos que busque todos los datos
            //console.log(lista);
        }  

        else if(filtro =='cuenta'){
            lista = await Pedidos_mesa.findAll({
                order: [
                    ['idregistro', 'ASC']
                ],
                where: {
                    cuenta: {
                        [Op.like]: '%'+buscar+'%'
                    }
                },
                include: {
                    model: modelosMesa,
                    attributes: ['Mesa']
                },
            raw: true,
            });//con el findall le indicamos que busque todos los datos
            //console.log(lista);
        }
        else if(filtro =='nombrecuenta'){
            order: [
                ['idregistro', 'ASC']
            ],
            lista = await Pedidos_mesa.findAll({
                where: {
                    nombrecuenta: {
                        [Op.like]: '%'+buscar+'%'
                    }
                },
                include: {
                    model: modelosMesa,
                    attributes: ['Mesa']
                },
            raw: true,
            });//con el findall le indicamos que busque todos los datos
            //console.log(lista);
        }    
        else {
            lista = await  Pedidos_mesa.findAll({
                order: [
                    ['idregistro', 'ASC']
                ],
                include: {
                    model: modelosMesa,
                    where: {
                        Mesa: {
                            [Op.like]: '%'+buscar+'%'
                        }
                    },
                    
                    attributes: ['Mesa']
                },
            raw: true,
            });

        
        }
        
              
    } catch (error) {
        
        res.json(error);
    }

    res.render("Pedidos_mesaBuscar",{
        titulo: 'Listado De Pedidos_Mesa',
        lista
    });
        
}


