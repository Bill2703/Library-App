require('dotenv').config();
const api = require("./api")
const PORT = process.env.PORT || 3000; // Fallback to 3000 if process.env.PORT is undefined

api.listen(PORT, () => {
    console.log(`API listening on ${PORT} 👂`);
});
