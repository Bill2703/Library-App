require("dotenv").config();
const fs = require('fs');

const db = require("./connect");

const books = fs.readFileSync('./database/books.sql').toString();
const users = fs.readFileSync("./database/users.sql").toString();


const setUp = async () => {
    try{
        await db.query(books);
        await db.query(users);
        console.log("DB Setup and Seeded 🌱.");
        db.end();
    } catch (error) {
        console.log(error + '❎');
    }
}

setUp();
