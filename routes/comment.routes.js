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

// Todos los comentarios



//Eliminar un comentario





module.exports = router;