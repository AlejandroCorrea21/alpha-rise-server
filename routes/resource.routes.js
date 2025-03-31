const express = require("express");
const router = express.Router();
const Resource = require(`../models/Resource.model`);
const verifyToken = require("../middlewares/auth.middlewares")

//Llamar todos los recursos (funciona)
router.get("/", async (req, res, next) => {
    try {
      const resources = await Resource.find()
      res.status(200).json(resources)
    } catch (error) {
      next(error)
    }
  });

// Añadir recurso (admin)
  router.post("/", verifyToken, async (req, res, next) => {
    try {
        const createdResources = await Resource.create({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            author: req.payload._id,
            origen: req.body.origen,
        });
        res.status(201).json(createdResources)
    } catch (error) {
        next(error)
    }
});

//Llamar recurso en específico
router.get("/:id", async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id)
        res.status(404).json({ errorMessage: "Recurso no encontrado" })
    } catch (error) {
        next(error)
    }
    })

//Editar un recurso (admin)
router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedResource)
    } catch (error) {
        next(error)
    }
});
//Eliminar un recurso (admin)
router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
        await Resource.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Recurso eliminado correctamente" })
    } catch (error) {
        next(error)
    }
});


module.exports = router;