const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

    console.log(req.headers)

    try {

        const token = req.headers.authorization.split(" ")[1] // extraer el token del header

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        //1. valida que el token sea correcto
        //2. nos devuelve el payload (la info del dueño de ese token)
        //3. causa un error si el token no es valido

        req.payload = payload // recojer el payload del token y pasarlo a la ruta

        next() // continua con la proxima ruta
    } catch (error) {

        res.status(401).json({ errorMessage: "token no valido o no existe" })

    }

}

function verifyAdminRole (req, res, next) {
    // el middleware siempre se pretende ejecutar después del verifyToken
    if(req.payload.role === "admin") {
        next() // si eres Admin continua.
    } else {
        res.status(401).json({ errorMessage: "ruta solo para admins" })
    }
}
module.exports = { verifyToken, verifyAdminRole }