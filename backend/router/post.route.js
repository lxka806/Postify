const express = require("express");
const router = express.Router();

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../controller/post.controller");

const { protect } = require("../middleware/auth.middleware");

// public
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// protected
router.post("/", protect, createPost);
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;