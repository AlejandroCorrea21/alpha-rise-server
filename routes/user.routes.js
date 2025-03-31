const express = require("express");
const router = express.Router();

const User = require(`../models/User.model`);

//Llamar a todos los usuarios
router.get("/users", async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

//Ver el perfil de un usuario en específico.
router.get("/users/:id", async (req, res, next)=>{
    try {
        const response = await User.findById(req.params.id)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
})
module.exports = router;