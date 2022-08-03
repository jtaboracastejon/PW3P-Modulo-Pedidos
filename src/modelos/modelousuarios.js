const {DataTypes} = require('sequelize');
const db = require('../configuracion/db');
//modelo es donde se genera o crea la tabla de la bdd para que la api conozca los campos que lleva
//con el const pedidos_elaborados le indicamos los campos de la tabla

const usuarios = db.define(
    'usuarios',
    {
        idregistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        LoginUsuario: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        empleado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Contraseña: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        AccesoTotal: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        Habilitado: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        pin: {
            type: DataTypes.TINYINT(4),
            allowNull: false
        },
        Fallidos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('BL','AC','IN'),
            allowNull: false
        },
    },
    {
        tableName:'usuarios', //aqui le indicamos el nombre a la tabla
        timestamps: false //para no agg campos de la fecha actual
    }
);

//con el sync creamos la trabla desde el visual
usuarios.sync().then(
    () => console.log("Sincronizacion Completa")
);
module.exports = usuarios;