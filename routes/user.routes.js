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

// Editar usuario
router.put("/:id", verifyToken, verifyAdminRole, async (req, res, next) => {
  try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updateUser)
  } catch (error) {
      next(error)
  }
});
module.exports = router;