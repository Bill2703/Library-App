const db = require("../database/connect")

class Book{
    constructor({book_id, title, author, blurb, stock}) {
        this.id = book_id
        this.title = title
        this.author = author
        this.blurb = blurb
        this.stock = stock
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM book");
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
        const { title, author, blurb, stock } = data;
    
        const existingBook = await db.query("SELECT * FROM book WHERE title = $1", [title]);
        if (existingBook.rows.length > 0) {
            throw new Error(`A book with the title '${title}' already exists.`);
        }
    
        const response = await db.query(
            "INSERT INTO book (title, author, blurb, stock) VALUES ($1, $2, $3, $4) RETURNING title;",
            [title, author, blurb, stock]
        );
    
        const bookName = response.rows[0].title.toLowerCase();
        const newBook = await Book.getOneByBookName(bookName);
        return newBook;
    }

    async destroy(){
        let response = await db.query("DELETE FROM book WHERE title = $1 RETURNING *;",[this.title])
        return new Book(response.rows[0])
    }
    

}

module.exports = Book;