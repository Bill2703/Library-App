const express = require("express")
const cors = require('cors');


const api = express();

api.use(cors());
api.use(express.json());

api.get("/", (req, res) => {
    res.json({
        title: "Library App",
        teamName: "On the same page"
    })
})

module.exports = api