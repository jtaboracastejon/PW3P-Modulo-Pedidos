const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
const meseros = db.define(
    'meseros', 
    {
        idmesero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'idmesero'
        },        
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'nombre',
            //get(){const nombremesero = this.getDataValue('nombre_mesero'); return nombremesero.join(' ').trim()}
        },       
    },
    {
        timestamps: false,
        tableName: 'meseros'
    }
)
// Esto es para crear la tabla por primera vez 
    meseros.sync().then(
    () => console.log("Tabla de meseros sincronizada")
); 
module.exports = meseros;