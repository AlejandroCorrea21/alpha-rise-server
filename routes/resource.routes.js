const express = require("express");
const router = express.Router();
const Resource = require(`../models/Resource.model`);
const { verifyToken, verifyAdminRole } = require("../middlewares/auth.middlewares")

//Llamar todos los recursos (funciona)
router.get("/", async (req, res, next) => {
    try {
      const { category } = req.query;
      let resources;
      if (category) {
        resources = await Resource.find({ category });
      } else {
        resources = await Resource.find();
      }
      res.status(200).json(resources);
    } catch (error) {
      next(error);
    }
});
  

// Añadir recurso (admin) (funciona)
  router.post("/", verifyToken, verifyAdminRole, async (req, res, next) => {
    try {
        const createdResources = await Resource.create({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            author: req.body.author,
            origen: req.body.origen,
            imageUrl: req.body.imageUrl,
        });
        res.status(201).json(createdResources)
    } catch (error) {
        next(error)
    }
});

//Llamar recurso en específico (funciona)
router.get("/:id", async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ errorMessage: "Recurso no encontrado" });
        }
        res.status(200).json(resource);
    } catch (error) {
        next(error);
    }
});

//Editar un recurso (admin) (funciona)
router.put("/:id", verifyToken, verifyAdminRole, async (req, res, next) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedResource)
    } catch (error) {
        next(error)
    }
});
//Eliminar un recurso (admin) (funciona)
router.delete("/:id", verifyToken, verifyAdminRole, async (req, res, next) => {
    try {
        await Resource.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Recurso eliminado correctamente" })
    } catch (error) {
        next(error)
    }
});


module.exports = router;