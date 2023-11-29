const { Router } = require('express');
const authenticator = require("../middleware/authenticator.js")

const postController = require('../controllers/post.js');

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.post("/", postController.create);
postRouter.get("/:id", postController.show);
postRouter.get("/:book_id", postController.getPostsByBookId);
postRouter.delete("/:id", postController.destroy);

module.exports = postRouter;