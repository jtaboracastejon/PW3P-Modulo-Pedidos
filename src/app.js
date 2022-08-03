
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const {engine} = require('express-handlebars')

require('dotenv').config()
const app = express()

app.engine(
    'handlebars', 
    engine({
        layoutsDir: __dirname + "/views/layouts",
        extname: "handlebars",
        partialsDir  : [
            path.join(__dirname, 'views/partials'),
        ]
    })
)
app.set('view engine', 'handlebars')
app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/home'),
    path.join(__dirname, './views/cargos'),
    path.join(__dirname, './views/pedidos'),
    path.join(__dirname, './views/detallePedido'),
    path.join(__dirname, './views/pedidos_cancelados'),
    path.join(__dirname, './views/pedidoselaborados'),
    path.join(__dirname, './views/Pedidos_mesa'),
])//Rutas donde estaran contenidas las vistas
app.use('/public',express.static(path.join(__dirname, 'public/')))//Ruta donde estaran contenidos los recursos

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/app', require('./rutas/index'))
app.use('/app/cargos', require('./rutas/rutasCargo'))
app.use('/app/pedidos', require('./rutas/rutasPedidos'))
app.use('/app/detallepedido', require('./rutas/rutasDetallePedido'))
app.use('/app/pedidos_mesa', require('./rutas/rutasPedidos_mesa'));
app.use('/app/pedidoselaborados', require('./rutas/rutapedidoelab'));
app.use('/app/pedidos_cancelados', require('./rutas/rutasPedidosCancelados'))
app.use('/app/pedidosVentas', require('./rutas/rutasPedidosVentas'))
app.use('/app/pedidosLlevar', require('./rutas/rutasPedidosLlevar'))
app.use('/app/entregaPedidos', require('./rutas/rutasEntregaPedidos'))

app.listen(process.env.port, () => {
    console.log('Servidor iniciado en el puerto ' + process.env.port)
})