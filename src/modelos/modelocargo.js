const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const Cargo = db.define(
    'cargo', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'CodigoCargo'
        },        
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'NombreCargo'
        },        
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
            field:'DescripcionCargo'
        },        
    },
    {
        timestamps: false,
        tableName: 'cargos'
    }
)
// Esto es para crear la tabla por primera vez 
    Cargo.sync().then(
    () => console.log("Sincronizacion Completa")
); 
module.exports = Cargo;