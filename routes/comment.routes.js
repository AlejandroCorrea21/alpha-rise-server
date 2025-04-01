const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const verifyToken = require("../middlewares/auth.middlewares")

//Crear un comentario
router.post("/:resourceId/comments", async (req, res, next) => {

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

//Editar un comentario



// Todos los comentarios



//Eliminar un comentario





module.exports = router;