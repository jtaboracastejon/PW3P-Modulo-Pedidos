const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const Clientes = db.define(
    'clientes', 
    {
        idcliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'idcliente'
        },        
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'nombre'
        } 
    },
    {
        timestamps: false,
        tableName: 'clientes'
    }
)

/* Esto es para crear la tabla por primera vez 
    Cargo.sync().then(
    () => console.log("Sincronizacion Completa")
); */
module.exports = Clientes;