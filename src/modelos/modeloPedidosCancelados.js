const { DataTypes } = require('sequelize');
const db = require('../configuracion/db');
const md = require('../modelos/modelousurio');
const Pedidos_Cancelados = db.define(
    'pedidos_cancelados',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            field: 'numeropedido'
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'usuario'
        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fechahora'
        },
    },
    {
        timestamps: false,
        tableName: 'pedidos_cancelados'
    }
)
Pedidos_Cancelados.belongsTo(md, {
    foreignKey:'idusuario',
    otherKey: 'idregistro'
})
Pedidos_Cancelados.sync().then(
    () => console.log("Sincronizacion Completa")
);
module.exports = Pedidos_Cancelados;