const express = require("express");
const router = express.Router();
const User = require(`../models/User.model`);
const { verifyToken, verifyAdminRole } = require("../middlewares/auth.middlewares")

//Llamar a todos los usuarios (Funciona)
router.get("/", async (req, res, next) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      next(error);
    }
  });

//Que el usuario vea su propio perfil (Funciona)
router.get("/profile", verifyToken, async (req, res, next)=>{
  try {
      const response = await User.findById(req.payload._id)
      res.status(200).json(response)
  } catch (error) {
      next(error)
  }
})

//Que el usuario pueda ver otro perfil (Revisar Jorge)
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.id)
    res.status(200).json(response);
  } catch (error) {
    next(error)
}
})
module.exports = router;