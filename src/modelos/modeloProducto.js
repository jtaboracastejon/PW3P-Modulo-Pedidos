const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const Productos = db.define(
    'productos', 
    {
        Codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            
        },
        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'productos'
    }
)
// Esto es para crear la tabla por primera vez 
Productos.sync().then(
    () => console.log("Sincronizacion Completa")
); 
module.exports = Productos;