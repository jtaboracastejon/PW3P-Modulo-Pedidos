const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const estaciones = db.define(
    'estaciones', 
    {
        idestacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'NumeroEstacion'
        },        
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'nombre'
        },        
    },
    {
        timestamps: false,
        tableName: 'estaciones'
    }
)
// Esto es para crear la tabla por primera vez 
    estaciones.sync().then(
    () => console.log("Tabla de estaciones sincronizada")
); 
module.exports = estaciones;