const { DataTypes } = require('sequelize');
const db = require('../configuracion/db');
const modeloPedidosMesas = require('../modelos/modeloPedidos_mesa');
const Pedido = db.define(
    'Pedido',
    {
        NumeroPedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idmesero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechahora: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        Estacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        modalidad: {
            type: DataTypes.ENUM('ME','DO','LL'),
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('AAA','NNN','SNN','SSN','SNS','SSS','NSS','NSN'),
            allowNull: true,
            defaultValue: 'NNN'
        }

    },
    {
        tableName: 'pedidos',
        timestamps: false //Para que no se genere la columna de fecha de creacion y actualizacion
    }
);


Pedido.belongsTo(modeloPedidosMesas, {
    foreignKey: 'NumeroPedido',
    otherKey: 'idpedido'
});
Pedido.sync()
.then(() => console.log('Tabla de pedidos sincronizada'));

module.exports = Pedido;