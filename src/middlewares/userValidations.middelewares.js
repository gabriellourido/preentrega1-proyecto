export const validarUsuario = (req, res, next) => {
    const user = req.body
    if (user.firstName === 'Esteban') {
        res.send('No tienes autorizacion para ejecutar esta peticion')
    } else {
        next()
    }
}