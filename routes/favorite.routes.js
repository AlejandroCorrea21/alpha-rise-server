const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

//Añadir favorito
router.get("/:id", verifyToken, async (req, res, next) => {
    try {
        const favorites = await Favorite.find({ user: req.params.id }).populate("resource");
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
