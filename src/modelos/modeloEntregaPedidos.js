const {DataTypes} = require('sequelize');
//const { FOREIGNKEYS } = require('sequelize/types/query-types');
const db = require('../configuracion/db');
const modelousuario =require('../modelos/modelosusuario');
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
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'usuario'
        },        
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        identrega: {
            type: DataTypes.INTEGER,
            allowNull: false
        },               
    },
    {
        timestamps: false,
        tableName: 'entrega_pedido'
    }
);

entregaPedidos.belongsTo(modelousuario,{ 
    foreignKey: 'idusuario',
    otherKey:'idregistro'
});
//Esto es para crear la tabla por primera vez 
    entregaPedidos.sync().then(
    () => console.log("Sincronizacion Completa")
); 
module.exports = entregaPedidos;