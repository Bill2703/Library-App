const Book = require("../models/Book")

async function index(req,res) {
    try {
        const books = await Book.getAll();
        res.status(200).json(books)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}


module.exports = {index}