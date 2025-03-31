const express = require("express");
const router = express.Router();
const Resource = require(`../models/Resource.model`);
const verifyToken = require("../middlewares/auth.middlewares")

//Llamar todos los recursos
router.get("/", async (req, res, next) => {
    try {
      const resources = await Resource.find();
      res.status(200).json(resources);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;