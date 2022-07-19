const Pedidos_mesa = require('../modelos/modeloPedidos_mesa');
const {validationResult} = require('express-validator');

exports.Listar = async(req, res) => {
    const pedidos_mesa = await Pedidos_mesa.findAll();
    res.json(pedidos_mesa);
}