const db = require("../database/connect");

class Post {

    constructor({ post_id, user_id, title, content }) {
        this.id = post_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async getByBookId(book_id) {
        const response = await db.query("SELECT * FROM post WHERE book_id = $1", [book_id]);
        if (response.rows.length === 0) {
            throw new Error("No posts!")
        }
        return response.rows.map(p => new Post(p));
    }

    static async create(data) {
        const { user_id, book_id, title, content } = data;
        let response = await db.query("INSERT INTO post (user_id, book_id, title, content) VALUES ($1, $2, $3, $4) RETURNING post_id;",
            [user_id, book_id ,title, content]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;