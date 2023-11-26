const db = require("../database/connect")

class Book{
    constructor({book_id, title, authour, blurb, stock}) {
        this.id = book_id
        this.title = title
        this.authour = authour
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
        if(response.rows.length != 1) {
            throw new Error("Unable to find book!")
        }
        return new Book(response.rows[0])
    }

}

module.exports = Book;