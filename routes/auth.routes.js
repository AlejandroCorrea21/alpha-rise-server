const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/auth.middlewares")

//Modelos
const User = require("../models/User.model")

// Aquí van las rutas de auth

// POST "/api/auth/signup" => Ruta para crear el documento del usuario. (nombre completo de la ruta)
router.post("/signup", async (req, res, next) => { //(prefijo de la ruta)

    // Validaciones de Servidor

    const { email, username, password } = req.body

    // verificar que los valores existe
    if (!email || !username || !password) {
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios" })
        return // detener la ejecución de la función (cláusula de guardia)
    }

    // que el usuario tenga mínimo 3 carácteres. BONUS
    // el usuario no incluya carácteres especiales BONUS

    // el password sea fuerte
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordRegex.test(password) === false) {
        res.status(400).json({ errorMessage: "Contraseña no es suficientemente fuerte. Requiere al menos una mayúscula, una minúscula, un número y 8 carácteres." })
        return // detener la ejecución de la función (cláusula de guardia)
    }

    // el email tenga el formato correcto. BONUS

    try {

        // que el email no se repita
        const foundUser = await User.findOne({ email: email })
        // console.log(foundUser)
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

    // que el email tenga el formato correcto. BONUS

    // que pueda hacer login con el email o con el usuario (si fuese único) BONUS

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

        // HEMOS AUTENTICADO AL USUARIO

        // creamos el token y lo enviamos al cliente

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
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
    // console.log(req.headers)

    //! CON EL REQ.PAYLOAD EL SERVIDOR SABE QUIEN ES EL USUARIO QUE ESTÁ HACIENDO LAS ACCIONES.
    console.log(req.payload)

    //! indicar al front end que el usuario fue validado recientemente Y EL FRONTED RECIBE INFO DE QUIEN ES ESE USUARIO
    res.status(200).json({ payload: req.payload })

})

// EJEMPLO DE RUTA PRIVADA SOLO ACCESIBLE PARA USUARIOS LOGEADOS
router.post("/crear-una-banana", verifyToken, (req, res) => {

    // Banana.create(...)

    console.log(req.payload._id) // Esto me dice el id del usuario que está creando la banana
    res.status(201).json("has creado una banana")
})

module.exports = router