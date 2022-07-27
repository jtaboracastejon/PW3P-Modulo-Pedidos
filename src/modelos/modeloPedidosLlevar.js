const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const modelocliente = require('../modelos/modeloCliente');
const modelosdetalle = require('../modelos/modeloDetallePedidos');
const pedidosLlevar = db.define(
    'pedidos_llevar', 
    {
        idRegistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'idregistro'
        },        
        idPedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'idpedido'
        },        
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'idcliente'
        },        
    },
    {
        timestamps: false,
        tableName: 'pedidos_llevar'
    }
);

pedidosLlevar.belongsTo(modelocliente,{ 
    foreignKey: 'idCliente',
    otherKey:'idcliente'
});

pedidosLlevar.belongsTo(modelosdetalle,{ 
    foreignKey: 'idPedido',
    otherKey:'idregistro'
});


// Esto es para crear la tabla por primera vez 
pedidosLlevar.sync().then(
    () => console.log("Sincronizacion Completa")
); 
module.exports = pedidosLlevar;