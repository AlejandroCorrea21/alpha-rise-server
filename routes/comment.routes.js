const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const { verifyToken }= require("../middlewares/auth.middlewares")

//Crear un comentario (funciona)
router.post("/", verifyToken, async (req, res, next) => {

    try {
        
        const created = await Comment.create({
            user: req.payload._id,
            resource: req.body.resource,
            text: req.body.text,
        });
       
        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
});

//Editar un comentario (funciona)
router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        const updateComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateComment)
    } catch (error) {
        next(error)
    }
});

// Todos los comentarios (funciona)
router.get("/", async (req, res, next) => {
    try {
      const comments = await Comment.find()
      res.status(200).json(comments)
    } catch (error) {
      next(error)
    }
  });


//Eliminar un comentario (funciona)
router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Comentario eliminado correctamente" })
    } catch (error) {
        next(error)
    }
});

//Comentario de un recurso específico
router.get("/resources/:id", async (req, res, next) => {
    try {
      const comments = await Comment.find({ resource: req.params.id }).populate('user', 'username')
      if(!comments) {
        return res.status(404).json({ errorMessage: "Aún no hay comentarios" });
      }
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;