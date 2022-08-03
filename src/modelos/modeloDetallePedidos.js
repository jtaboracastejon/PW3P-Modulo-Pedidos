const {DataTypes}=require('sequelize')
const db = require('../configuracion/db')
const modeloProductos = require('../modelos/modeloProducto')

const detalle_pedido = db.define(
    'detalle_pedido',
    {
        idregistro:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        NumeroPedido:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        CodigoProducto:{
            type:DataTypes.STRING(15),
            allowNull:false
        },
        Cantidad:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        Cancelado:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        Notas:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        Elaborado:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        Entregado:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        Facturado:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        subproducto:{
            type:DataTypes.INTEGER,
            allowNull:true,
        }
    },
    {
        timestamps:false,
        tableName:'detalle_pedido'
    }
)

detalle_pedido.belongsTo(modeloProductos,{
    foreignKey:'CodigoProducto',
    sourceKey:'Codigo',
});

detalle_pedido.sync().then(
    () => console.log("Sincronizacion Completa")
);

module.exports = detalle_pedido;