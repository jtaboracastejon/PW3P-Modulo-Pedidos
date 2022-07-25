const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const entregaPedidos = db.define(
    'entrega_pedido', 
    {
        idDetalle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: false,
            field:'iddetalle_pedido'
        },        
        usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'usuario'
        },        
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
            field:'fechahora'
        }, 
        identrega: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'identrega'
        },               
    },
    {
        timestamps: false,
        tableName: 'entrega_pedido'
    }
)
/* Esto es para crear la tabla por primera vez 
    Cargo.sync().then(
    () => console.log("Sincronizacion Completa")
); */
module.exports = entregaPedidos;