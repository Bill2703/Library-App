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
        let name = req.params.name.toLowerCase(); 
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

async function update(req,res){
    try{
        const name = req.params.name.toLowerCase();
        const data = req.body;
        console.log("NAME: " + name); 
        console.log(data);
        const book = await Book.getOneByBookName(name)
        let result = await book.update(data);
        res.status(201).json(result)
    }catch(err){
        res.status(404).json({err : err.message})
    }
}

async function updateStock(req,res){
    try{
        const name = req.params.name.toLowerCase();
        const data = req.body;
        console.log(name);
        console.log(data);

        const user_id = data.user_id;
        const book_id = data.book_id;
        const username = data.username;

        const book = await Book.getOneByBookName(name)

        console.log("hit1");

        // console.log(user_id);
        // console.log(book_id);
        // console.log(book);
        // console.log(book.id);

        const hasRented = await Book.hasUserRentedBook(user_id, book_id);

        console.log("hit2");

        if (hasRented) {
            // Handle the case where the user has already rented the book
            return res.status(400).json({ error: "User has already rented this book." });
        }

        console.log("hit3");

        let result = await book.updateStock(data);

        console.log("hit4");

        await Book.insertRental(user_id, book_id)

        console.log("hit5");

        res.status(201).json(result)
    }catch(err){
        res.status(404).json({err : err.message})
    }
}

// async function updateStock(req, res){

// }


module.exports = {index, show, create, destroy, update, updateStock}