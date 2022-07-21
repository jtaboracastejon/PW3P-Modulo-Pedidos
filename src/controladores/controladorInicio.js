exports.Inicio = (req, res) => {
    const titulo = 'Vista desde inicio'
    res.render("inicio", {titulo})
}

exports.Home = (req, res) => {
    const titulo = 'Ejemplo vista en node js'
    res.render("home", {titulo})
}