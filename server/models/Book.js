const db = require("../database/connect")

class Book{
    constructor({book_id, title, author, blurb, stock, coverimageurl}) {
        this.id = book_id
        this.title = title
        this.author = author
        this.blurb = blurb
        this.stock = stock
        this.coverimageurl = coverimageurl
    }
    

    static async getAll(){
        const response = await db.query("SELECT * FROM book");
        console.log(response.rows);
        if(response.rows.length === 0){
            throw new Error("No books available!")
        } else {
            return response.rows.map(book => new Book(book));
        }
    }

    static async getOneByBookName(bookName){
        const response = await db.query("SELECT * FROM book WHERE LOWER(title) = $1",[bookName])
        //console.log(response.rows);
        if (response.rows.length > 1 ){
            throw new Error("More than one book of same name!")
        }
        else if(response.rows.length != 1) {
            throw new Error("Unable to find book!")
        }
        return new Book(response.rows[0])
    }

    static async create(data) {
        const { title, author, blurb, stock, coverimageurl } = data;
    
        const existingBook = await db.query("SELECT * FROM book WHERE title = $1", [title]);
        if (existingBook.rows.length > 0) {
            throw new Error(`A book with the title '${title}' already exists.`);
        }
    
        const response = await db.query(
            "INSERT INTO book (title, author, blurb, stock, coverimageurl) VALUES ($1, $2, $3, $4, $5s) RETURNING title;",
            [title, author, blurb, stock, coverimageurl]
        );
    
        const bookName = response.rows[0].title.toLowerCase();
        const newBook = await Book.getOneByBookName(bookName);
        return newBook;
    }

    async destroy(){
        let response = await db.query("DELETE FROM book WHERE title = $1 RETURNING *;",[this.title])
        return new Book(response.rows[0])
    }
    

    async update(data) {
        const { title, author, blurb, stock, coverimageurl } = data;
    
        if (title !== this.title) {
            const existingBook = await db.query("SELECT * FROM book WHERE title = $1", [title]);
            if (existingBook.rows.length > 0) {
                throw new Error(`A book with the title '${title}' already exists.`);
            }
        }

        const response = await db.query(
            "UPDATE book SET title=$1, author=$2, blurb=$3, stock=$4, coverimageurl=$5 WHERE title=$6 RETURNING *",
            [title, author, blurb, stock, coverimageurl, this.title]
        );
    
        const bookName = response.rows[0].title.toLowerCase();
        const updatedBook = await Book.getOneByBookName(bookName);
        return updatedBook;
    }
    

}

module.exports = Book;