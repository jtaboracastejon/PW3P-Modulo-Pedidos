const sequelize = require('sequelize');

const db = new sequelize(
    process.env.nombrebd,
    process.env.usuariobd,
    process.env.contrasenabd,
    {
        host: process.env.ipbd,
        dialect: 'mysql',
        port: 3306,
        "pool":{
            "max": 1,
            "min": 1,
            "idle": 200000,
            "acquire": 200000
        },
        "retry":{"max": 3},
        "dialectOptions": {
            "requestTimeout": 0,
            "connectTimeout": 0,
        },
    }
)

module.exports = db