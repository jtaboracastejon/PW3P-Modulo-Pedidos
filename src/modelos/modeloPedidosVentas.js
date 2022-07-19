const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const pedidosVentas = db.define(
    'pedidos_x_ventas', 
    {
        numeroFactura: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'NumeroFactura'
        },        
        numeroPedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'NumeroPedido'
        }   
    },
    {
        timestamps: false,
        tableName: 'pedidos_x_ventas'
    }
)
/* Esto es para crear la tabla por primera vez 
    Cargo.sync().then(
    () => console.log("Sincronizacion Completa")
); */
module.exports = pedidosVentas;