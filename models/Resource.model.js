const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const resourceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["libro", "frase", "texto bíblico", "otro"],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: { 
            type: String, 
            required: true
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        views: {
            type: Number,
            default: 0,
        },
        origen: {
            type: String,
            enum: ["Grecia", "Francia", "Brazil", "Israel", "Jerusalén", "Roma", "Gran Bretaña", "Egipto", "Otro"],
            required: true,
        },
        imageUrl: {
            type: String,
          },
        },
        {
          timestamps: true,
        }
      );
      
      const Resource = model("Resource", resourceSchema);
      
      module.exports = Resource;