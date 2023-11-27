const { Router } = require("express")

const bookController = require("../controllers/books")
const bookRouter = Router();

bookRouter.get("/", bookController.index)
bookRouter.get("/:id", bookController.show)
bookRouter.post("/", bookController.create)
bookRouter.delete("/:", bookController.destroy)
bookRouter.patch("/:name", bookController.update)

module.exports = bookRouter;