const Book = require("../models/Book")

async function index(req,res) {
    try {
        const books = await Book.getAll();
        res.status(200).json(books)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function show(req,res){
    try{
        let name = req.params.name.toLowerCase(); //expected parameter at endpoint = name
        const book = await Book.getOneByBookName(name)
        res.status(200).json(book)
    }catch (err) {
        res.status(404).json({ error : err.message})
    }
}


module.exports = {index, show}