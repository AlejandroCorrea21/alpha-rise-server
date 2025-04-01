const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const favoriteSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        resource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
            required: true
        }
    },
    { timestamps: true }
);

const Favorite = model("Favorite", favoriteSchema);
module.exports = Favorite;
