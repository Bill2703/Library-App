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

async function create(req, res){
    try{
        const data = req.body;
        const newBook = await Book.create(data)
        res.status(201).json(newBook)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

async function destroy(req,res){
    try{
        const title = req.params.name.toLowerCase();
        const book = await Book.getOneByBookName(title)
        await book.destroy();
        res.sendStatus(204);
    }catch(err){
        res.status(404).json({error : err.message})
    }
}


module.exports = {index, show, create, destroy}