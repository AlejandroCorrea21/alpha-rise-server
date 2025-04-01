const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { verifyToken, verifyAdminRole } = require("../middlewares/auth.middlewares")

const User = require("../models/User.model")


// POST "/api/auth/signup" => Ruta para crear usuario. (Funciona)
router.post("/signup", async (req, res, next) => {

    // Validaciones de Servidor

    const { email, username, password } = req.body

    // verificar que los valores existe
    if (!email || !username || !password) {
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios" })
        return //(cláusula de guardia)
    }

    // el password sea fuerte
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordRegex.test(password) === false) {
        res.status(400).json({ errorMessage: "Contraseña no es suficientemente fuerte. Requiere al menos una mayúscula, una minúscula, un número y 8 carácteres." })
        return //(cláusula de guardia)
    }

    try {

        // que el email no se repita
        const foundUser = await User.findOne({ email: email })

        if (foundUser !== null) {
            res.status(400).json({ errorMessage: "Ya existe un usuario con ese email" })
            return // detener la ejecucion de la funcion
        }

        const hashPassword = await bcrypt.hash(password, 12)

        await User.create({
            email: email,
            username: username,
            password: hashPassword
        })

        res.sendStatus(201)

    } catch (error) {
        next(error)
    }

})

// POST "/api/auth/login" => Ruta para validar credenciales del usuario y crear el token.
router.post("/login", async (req, res, next) => {

    const { email, password } = req.body

    // que los campos existan
    if (!email || !password) {
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios" })
        return
    }

    try {

        // que el usuario exista con ese email
        const foundUser = await User.findOne({ email: email })
        if (foundUser === null) {
            res.status(400).json({ errorMessage: "Usuario no encontrado con ese email" })
            return
        }

        // que la contraseña corresponda con la almacenada
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if (isPasswordCorrect === false) {
            res.status(400).json({ errorMessage: "Contraseña no valida" })
            return
        }

        // AUTENTICAMOS AL USUARIO

        // creamos el token y lo enviamos al cliente

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role

            // si tuvieramos roles, también tendrían que ir aquí.
        } // el payload es la información única del usuario que lo identifica, que estará dentro del token.

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: "7d" })

        res.status(200).json({ authToken: authToken })

    } catch (error) {
        next(error)
    }
})

// GET "/api"/auth"verify" => Ruta para verificar validez del token e indicar a toda la aplicación que el usuario fué autenticado.
router.get("/verify", verifyToken, (req, res) => {

    // tenemos que validar el token. Lo validamos con el middleware verifyToken.

    //! CON EL REQ.PAYLOAD EL SERVIDOR SABE QUIEN ES EL USUARIO QUE ESTÁ HACIENDO LAS ACCIONES.
    console.log(req.payload)

    //! indicar al front end que el usuario fue validado recientemente Y EL FRONTED RECIBE INFO DE QUIEN ES ESE USUARIO
    res.status(200).json({ payload: req.payload })

})

// Ejemplo de ruta privada solo para usuarios logueados.
router.post("/private-page", verifyToken, (req, res) => {

    console.log(req.payload._id)
    res.status(201).json("has creado una página privada")
})

// Ejemplo de ruta privada solo para usuario logueado y admin.
router.delete("/delete-resource", verifyToken, verifyAdminRole, (req, res) => {
    res.status(201).json("borrado resource")
})
module.exports = router