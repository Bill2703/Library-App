const { Router } = require("express")

const bookController = require("../controllers/books")
const bookRouter = Router();

bookRouter.get("/", bookController.index)
bookRouter.get("/:name", bookController.show)
bookRouter.post("/", bookController.create)
bookRouter.delete("/:name", bookController.destroy)

module.exports = bookRouter;