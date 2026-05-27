const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        name: String,
        text: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);