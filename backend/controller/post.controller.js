const Post = require("../model/post.model");

// GET ALL POSTS
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user");
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE POST
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("user");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE POST
const createPost = async (req, res) => {
    try {
        const post = await Post.create({
            name: req.body.name,
            text: req.body.text,
            user: req.user._id
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE POST
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE POST
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await post.deleteOne();

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};