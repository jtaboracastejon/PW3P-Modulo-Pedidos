const Pedidos_mesa = require('../modelos/modeloPedidos_mesa');
const {validationResult} = require('express-validator');
const { text } = require('express');

exports.Listar = async(req, res) => {
    const pedidos_mesa = await Pedidos_mesa.findAll();
    res.json(pedidos_mesa);
}

exports.Guardar = async (req, res) =>{
    const {idpedido,idmesa, cuenta, nombrecuenta} = req.body;
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