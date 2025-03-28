const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        user: {
            required: true,
        },
        resource: {
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        isAdmin: {
            type: Boolean,
            default: false, // preguntar a jorge si es false o true.
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;