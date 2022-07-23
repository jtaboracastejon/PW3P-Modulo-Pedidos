const express = require('express')
const morgan = require('morgan')
const path = require('path')

const {engine} = require('express-handlebars')

require('dotenv').config()
const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, './views'))//Rutas donde estaran contenidas las vistas
app.use('/public',express.static(path.join(__dirname, 'public/')))//Ruta donde estaran contenidos los recursos

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/app', require('./rutas/index'))

app.use('/app/cargos', require('./rutas/rutasCargo'))
app.use('/app/pedidoselaborados', require('./rutas/rutapedidoelab'))


app.listen(process.env.port, () => {
    console.log('Servidor iniciado en el puerto ' + process.env.port)
})