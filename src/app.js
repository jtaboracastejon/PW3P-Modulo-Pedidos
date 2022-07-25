const express = require('express')
const morgan = require('morgan')
const path = require('path')

const {engine} = require('express-handlebars')

require('dotenv').config()
const app = express()

app.set("view engine", "handlebars");

app.engine(
    "handlebars",
    engine({
        layoutsDir:__dirname + "/views/layouts",
        extname: "handlebars",
        partialsDir :[ 
            path.join(__dirname, 'views/partials'),
        ]
    })
);

app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/home'),
    path.join(__dirname, './views/entregaPedidos')
])
app.use('/public',express.static(path.join(__dirname, 'public/')))//Ruta donde estaran contenidos los recursos


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/app', require('./rutas/index'))

app.use('/app/cargos', require('./rutas/rutasCargo'))
app.use('/app/pedidosLlevar', require('./rutas/rutasPedidosLlevar'))
app.use('/app/entregaPedidos', require('./rutas/rutasEntregaPedidos'))

app.listen(process.env.port, () => {
    console.log('Servidor iniciado en el puerto ' + process.env.port)
})