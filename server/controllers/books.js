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

        const user_id = data.user_id;
        const book_id = data.book_id;
        const book = await Book.getOneByBookName(name)

        const hasRented = await Book.hasUserRentedBook(user_id, book_id);
        if (hasRented) {
            // Handle the case where the user has already rented the book
            return res.status(400).json({ error: "User has already rented this book." });
        }

        let result = await book.updateStock(data);
        await Book.insertRental(user_id, book_id)

        res.status(201).json(result)
    }catch(err){
        res.status(404).json({err : err.message})
    }
}

async function returnBook(req, res) {
    try {
        const title = req.params.name;
        const titleToLower = title.toLowerCase();
        const data = req.body;

        const book = await Book.getOneByBookName(titleToLower);

        const hasRented = await Book.hasUserRentedBook(data.user_id, book.id);
        if (!hasRented) {
            return res.status(400).json({ error: "User has not rented this book." });
        }

        await book.updateStock({title, stock: book.stock + 1 });

        console.log(data.user_id);
        console.log(book.id);
        await Book.deleteRental(data.user_id, book.id);

        res.status(200).json({ message: 'Book returned successfully.' });
    } catch (err) {
        console.error('Error during book return:', err);
        res.status(500).json({ error: 'Failed to return book.' });
    }
}

async function updateRating(req,res){
    try{
        const title = req.params.name;
        const titleToLower = title.toLowerCase();
        const data = req.body;
    
        const book = await Book.getOneByBookName(titleToLower);
        const rating = data.rating;
        const book_id = book.id;
    
        await Book.updateRating(book_id, rating);
        res.status(200).json({message: "Updated rating!"})

    }catch(err){
        console.error('Error during rating update:', err);
        res.status(500).json({ error: 'Failed to update rating' });
    }
}


module.exports = {index, show, create, destroy, update, updateStock, returnBook, updateRating}