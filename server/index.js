require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Fallback to 3000 if process.env.PORT is undefined

app.listen(PORT, () => {
    console.log(`API listening on ${PORT} 👂`);
});
