const { DataTypes } = require('sequelize');
const db = require('../configuracion/db');


const Mesas_x_area = db.define(
    'mesas_x_area',
    {
        idregistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field: 'idregistro'
        },

        Mesa: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'Mesa'
        },
    },
    {
        timestamps: false,
        tableName: 'mesas_x_area'
    }
)    

Mesas_x_area.sync().then(
    () => console.log("Tabla de mesas sincronizada")
)


module.exports = Mesas_x_area;