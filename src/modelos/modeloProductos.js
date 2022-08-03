const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const Productos = db.define(
    'productos', 
    {
        Codigo: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
            field:'Codigo'
        },        
        Nombre: {
            type: DataTypes.STRING(40),
            allowNull: false,
            field:'Nombre'
        },        
        Descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
            field:'Descripcion'
        },  
        Imagen: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            field:'Imagen'
        },             
    },
    {
        timestamps: false,
        tableName: 'productos'
    }
);

// Esto es para crear la tabla por primera vez 
Productos.sync().then(
    () => console.log("Sincronizacion Completa")
); 
module.exports = Productos;