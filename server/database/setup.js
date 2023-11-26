require("dotenv").config();
const fs = require('fs');

const db = require("./connect");

const sql = fs.readFileSync('./database/books.sql').toString();


const setUp = async () => {
    try{
        await db.query(sql);
        console.log("DB Setup and Seeded 🌱.");
        db.end();
    } catch (error) {
        console.log(error + '❎');
    }
}

setUp();
