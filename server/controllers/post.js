const Post = require("../models/Post")

async function index (req, res) {
    try {
        const posts = await Post.getAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create(req, res) {
    try {
        const data = req.body;
        const result = await Post.create(data);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        res.json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        const result = await post.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function getPostsByBookId(req, res) {
    try {
        const book_id = req.params.book_id; // Assuming you extract book_id from the request parameters

        // Call the model function to get posts
        const posts = await Post.getByBookId(book_id);

        res.status(200).json(posts);
    } catch (err) {
        console.error('Error getting posts by book_id:', err);
        res.status(500).json({ error: 'Failed to get posts.' });
    }
}


module.exports = {
    index, create, show, destroy, getPostsByBookId
}