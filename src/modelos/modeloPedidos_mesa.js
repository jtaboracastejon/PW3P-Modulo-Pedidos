const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const ModelosMesas = require('../modelos/modeloMesas_x_area');

const Pedidos_mesa = db.define(
    'pedidos_mesa',
    {
       idregistro:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'idregistro'
       },
       idpedido:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idpedido'
       },
       idmesa:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idmesa'
       },
       cuenta:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
        field: 'cuenta'
       },
       nombrecuenta:{
        type: DataTypes.STRING(45),
        allowNull: false,
        field: 'nombrecuenta'
       },
    },
    {
        timestamps: false,
        tableName: 'pedidos_mesa'
    }
)

Pedidos_mesa.belongsTo(ModelosMesas,{
    foreignKey: 'idmesa',
    otherKey: 'idregistro'
});


module.exports = Pedidos_mesa;