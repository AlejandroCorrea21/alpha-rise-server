const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        resource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
      timestamps: true
    }
  );

const Comment = model("Comment", commentSchema);

module.exports = Comment;