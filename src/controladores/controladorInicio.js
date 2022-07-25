exports.Inicio = (req, res) => {
    const titulo = 'Ejemplo vista en controlador inicio'
    res.render("inicio",{titulo})
}

exports.Home = (req, res) => {
    const titulo = 'Ejemplo vista en node js controlador home'
    res.render("home", {titulo})
}