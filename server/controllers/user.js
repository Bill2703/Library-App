const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require("../models/Token")

async function register (req, res) {
    const data = req.body;
    //CREATING HASH FOR PASSWORDS
    console.log("pre-hash: " + data);
    
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    data["password"]= await bcrypt.hash(data.password, salt);

    console.log("post-hash: " + data);

    const result = await User.create(data);
    console.log(result);
    res.status(201).send(data);
};

async function login (req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username);
        const authenticated = await bcrypt.compare(data.password, user.password)
        if(!authenticated){
            throw new Error("Incorrect credentials")
        } else {
            const token = await Token.create(user["id"])
            res.status(200).json({authenticated: true, token: token.token});
        }
    } catch(err){
        res.status(401).json({error: err.message})
    }
}

module.exports = {
    register, login
}          