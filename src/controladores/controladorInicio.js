exports.Inicio = (req, res) => {
    res.send("Hola desde controlador inicio")
}

exports.Home = (req, res) => {
    const titulo = 'Ejemplo vista en node js'
    res.render("home", {titulo})
}