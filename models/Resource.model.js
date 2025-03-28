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
            enum: ["libro", "frase", "texto bíblico", "artículo", "otro"],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        favorites: [],
        views: {
            type: Number,
            default: 0,
        },
        origen: {
            type: String,
            enum: ["Grecia", "Israel", "Gran Bretaña", "Egipto", "Otro"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Resource = model("Resource", resourceSchema);

module.exports = Resource;
