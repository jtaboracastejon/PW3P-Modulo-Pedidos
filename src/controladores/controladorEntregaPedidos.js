const entregaPedidos = require('../modelos/modeloEntregaPedidos');
const { validationResult } = require('express-validator');
const modelousuario = require('../modelos/modelosusuario');
const db = require('../configuracion/db');
const { QueryTypes } = require('sequelize');
//const { where } = require('sequelize/types');

exports.Listar = async (req, res) => {
    const entrega_pedidos = await entregaPedidos.findAll({
        include: [{
            model: modelousuario,
            attributes: ['LoginUsuario']
        }],
        logging: console.log,
        raw: true
    });
    //res.json(entrega_pedidos);
    res.render("entregaPedidosIndex", {
        titulo: 'Listado de entrega de pedidos',
        entrega_pedidos
    })
    console.log(entrega_pedidos)
};


exports.Nuevo = async (req, res) => {
    
      try{ 
        const listausuarios = await modelousuario.findAll({
        raw:true
       });
       console.log(listausuarios);
        res.render("entregaPedidosGuardar", {
        titulo: 'Nuevo pedido',
        listausuarios});
        }
            catch (error) {
                console.log(error);
                res.render("error",{
                titulo:'error',
                error
                });
            }
    };



exports.Buscar = async (req, res) => {
        try {
                const entrega_pedidos = await entregaPedidos.findAll({
                    include: [{
                        model: modelousuario,
                        attributes: ['LoginUsuario']
                    }],
                    logging: console.log,
                    raw: true
                });
                res.render("entregaPedidosBuscar", {
                    titulo: 'Buscar pedido entregado',
                    entrega_pedidos
                });
            }
            catch (error) {
                res.json(error);
            }
        };

        exports.listarEntregas = async (req, res) => {
            const listarEntregas = await db.query("select * from listarentregas", { type: QueryTypes.SELECT });
            if (listarEntregas.length == 0) {
                res.send("No existen datos!!!");
            }
            else {
                res.render("entregaPedidosIndex", {
                    titulo: 'Listado de entrega de pedidos',
                    listarEntregas
                })
                console.log(listarEntregas);
            }
        };


exports.Guardar = async (req, res) => {

            console.log(req.body);
            const validacion = validationResult(req);
            if(validacion.errors.length>0){
            let mensaje='';
            validacion.errors.forEach(element => {
                console.log(element);
                mensaje+=element.msg + '. ';
        });
        res.send(mensaje);

            } else {
                const { idDetalle, idusuario, fechahora, identrega } = req.body;
                console.log(idDetalle);
                console.log(idusuario);
                console.log(fechahora);
                console.log(identrega);
                var texto = ''
                try {
                    await entregaPedidos.create({...req.body})
                        .then((data) => {
                            console.log(data);
                            texto = "Entrega de pedido guardada!!"
                        })
                        .catch((err) => {
                            console.log(err);
                            texto = "Error al guardar!!"
                        })
                } catch (error) {
                    console.log(error);
                    texto = "Error al guardar la entrega!!"
                }
                res.send(texto)

            }
        };

        exports.Editar = async (req, res) => {
            const validacion = validationResult(req);
            if (validacion.errors.length > 0) {
                let mensaje = ''
                validacion.errors.forEach(error => {
                    mensaje += error.msg + '. '
                })
                res.send(mensaje)

            } else {
                const { idDetalle } = req.query;

                var texto = ''
                try {
                    var buscarPedido = await entregaPedidos.findOne(
                        {
                            where: {
                                idDetalle: idDetalle
                            }
                        }
                    )
                    if (entregaPedidos) {
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
                                texto = "Entrega  Actualizada"
                            }).catch((err) => {
                                console.log(err);
                                texto = "Error al actualizar la entrega"
                            })
                    } else {
                        texto = "No existe el registro de entrega"
                    }
                } catch (error) {
                    console.log(error);
                    texto = "Error al actualizar la entrega"
                }
                res.send(texto)
            }
        };
        exports.Eliminar = async (req, res) => {
            const validacion = validationResult(req);
            if (validacion.errors.length > 0) {
                let mensaje = '';
                validacion.errors.forEach(Element => {
                    console.log(Element);
                    mensaje += Element.msg + ', ';
                });
                res.send(mensaje);
            }
            else {
                const { idDetalle } = req.query;
                var texto = "";
                try {
                    var buscarPedido = await entregaPedidos.findOne({
                        where: {
                            idDetalle: idDetalle
                        }
                    });
                    if (!buscarPedido) {
                        texto = "Este registro de entrega no existe"
                    }
                    else {
                        await entregaPedidos.destroy({ where: { idDetalle: idDetalle } })
                            .then((data) => {
                                console.log(data);
                                texto = "entrega eliminada!!"
                            })
                            .catch((err) => {
                                console.log(err);
                                texto = "Error al eliminar la entrega!!"
                            });
                    }

                } catch (error) {
                    console.log(error);
                    texto = "Error al eliminar de la base de datos"
                }
                res.send(texto)
            }
        };