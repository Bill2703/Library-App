require("dotenv").config();
const fs = require('fs');

const db = require("./connect");

const books = fs.readFileSync('./database/books.sql').toString();
const users = fs.readFileSync("./database/users.sql").toString();
const book_rental = fs.readFileSync("./database/booking.sql").toString();


const setUp = async () => {
    try{
        await db.query(books);
        await db.query(users);
        await db.query(book_rental);
        console.log("DB Setup and Seeded 🌱.");
        db.end();
    } catch (error) {
        console.log(error + '❎');
    }
}

setUp();
