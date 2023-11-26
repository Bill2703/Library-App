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

}

module.exports = Book;