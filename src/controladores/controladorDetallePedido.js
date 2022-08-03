
const modeloDetallePedidos = require('../modelos/modeloDetallePedidos');
const modeloPedidos = require('../modelos/modeloPedidos');
const modeloProductos = require('../modelos/modeloProducto');
const {validationResult} = require('express-validator');
const { Op } = require('sequelize');


exports.Listar = async (req, res) => {
    try {
        const lista = await modeloDetallePedidos.findAll({
            order: [
                ['idregistro', 'ASC']
            ],
            include: [
                {
                    model: modeloProductos,
                },
            ],
            raw: true
        });
        /* const listaSubproductos = await modeloProductos.findAll({raw: true});
        console.log(listaSubproductos)
        lista.forEach(element => {
        var index = listaSubproductos.map(function(item){return item.CodigoProducto}).indexOf(element.subproducto);
        element.subproducto = listaSubproductos[index].Nombre;
        }); */

        res.render("detallepedidoIndex",{
        titulo: "Lista de Detalle Pedidos",
        lista})
        //console.log(lista)
    } catch (error) {
        console.error(error);        
        res.render("detallepedidoIndex",{
        titulo: "Lista de Detalle Pedidos",
        })
    }
}

exports.BuscarId = async (req, res) => {
    try {
        const id = req.query.id;
        const detallePedido = await modeloDetallePedidos.findOne({
            where: {
                idregistro: id
            },
            raw: true,
        });
        //foreach pedido.estado
        const producto = await modeloProductos.findOne({
            where: {
                Codigo: detallePedido.CodigoProducto
            },
            attributes: ['nombre'],
            raw: true
        });
        const subproducto = await modeloProductos.findOne({
            where: {
                Codigo: detallePedido.subproducto
            },
            attributes: ['nombre'],
            raw: true
        });
        const listaProductos = await modeloProductos.findAll({
            raw: true
        });
        // console.log(producto.nombre+' Soy producto')
        res.render("detallepedidoBuscarId", {
            titulo: 'Editar Detalle Pedido',
            detallePedido,
            producto,
            subproducto,
            listaProductos
        });
    }
    catch (error) {
        console.log(error);
        res.render("detallepedidoBuscarId", {
            titulo: error,
            error
        });
    }
}

exports.Buscar = async (req, res) => {
    const filtro = req.query.filtro;
    const buscar = req.query.buscar;
    let lista=[]
    try{
        if(filtro === undefined || buscar === undefined){
            lista = await modeloDetallePedidos.findAll({
                order: [
                    ['idregistro', 'ASC']
                ],
                include: [
                    {
                        model: modeloProductos,
                    },
                ],
                raw: true
            });
            
        }
        else{
            if(filtro == 'NumeroPedido'){
                lista = await modeloDetallePedidos.findAll({
                    order: [
                        ['idregistro', 'ASC']
                    ],
                    where: {
                        [filtro]: {
                            [Op.like]: '%' + buscar + '%'
                        }
                    },
                    include: [
                        {
                            model: modeloProductos,
                        },
                    ],
                    raw: true
                });
            }
            else{
                lista = await modeloDetallePedidos.findAll({
                    order: [
                        ['idregistro', 'ASC']
                    ],
                    include: [
                        {
                            model: modeloProductos,
                            where: {
                                Nombre: {
                                    [Op.like]: '%' + buscar + '%'
                                }
                            },
                        },
                    ],
                    raw: true
                });
            }
        }
    } catch (error) {
        console.error(error);        
        res.render("detallepedidoBuscar",{
        titulo: "Lista de Detalle Pedidos",
        })
    }
    res.render("detallepedidoBuscar",{
        titulo: "Lista de Detalle Pedidos",
        lista})
        //console.log(lista)
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
        const {NumeroPedido, CodigoProducto, Cantidad, Notas, subproducto, Cancelado,Elaborado,Entregado,Facturado} = req.body;
        try {
            await modeloDetallePedidos.create({
                NumeroPedido,
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
        const {id} = req.query;
        var texto=''
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro:id
                }
            })
            if(buscarDetallePedido){
                await buscarDetallePedido.update(
                    {
                        ...req.body                        
                    },
                    {
                        where: {
                            idregistro: id
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
        const {id} = req.query;
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro:id
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
            texto="Error al eliminar en la base de datos"
        }
        res.send(texto) 
    }
}

//Vistas
exports.Nuevo = async (req, res) => {
    try {
        const listaProductos = await modeloProductos.findAll({
            raw: true
        });
        //console.log(listaMesas);
        //console.log(window.location.href)
        res.render("detallepedidoNuevo", {
            titulo: 'Nuevo detalle pedido',
            listaProductos,
            //listarClientes
        });
    }
    catch (error) {
        console.log(error);
        res.render("error", {
            titulo: 'Error',
            error
        });
    }
}