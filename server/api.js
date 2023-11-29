const express = require("express")
const cors = require('cors');

const logger = require("./middleware/logger")
const bookRouter = require("./routers/books");
const userRouter = require("./routers/user")

const api = express();

api.use(express.json());
api.use(cors());
api.use(logger);

api.use("/books", bookRouter)
api.use("/users", userRouter)

api.get("/", (req, res) => {
    res.json({
        title: "Library App",
        teamName: "On the same page"
    })
})

module.exports = api
