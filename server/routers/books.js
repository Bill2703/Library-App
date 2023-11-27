const { Router } = require("express")
const authenticator = require("../middleware/authenticator")

const bookController = require("../controllers/books")
const bookRouter = Router();

bookRouter.get("/", authenticator, bookController.index)
bookRouter.get("/:name", bookController.show)
bookRouter.post("/", bookController.create)
bookRouter.delete("/:name", bookController.destroy)
bookRouter.patch("/:name", bookController.update)

module.exports = bookRouter;