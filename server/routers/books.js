const { Router } = require("express")

const bookController = require("../controllers/books")
const bookRouter = Router();

bookRouter.get("/", bookController.index)

module.exports = bookRouter;