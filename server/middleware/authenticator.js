const Token = require("../models/Token")

//next is what allows us to move on to the next piece of middleware or part of the code

async function authenticator(req, res, next){
    try {
        const userToken = req.headers.authorization;
        if (!userToken){
            throw new Error("User not authenticated!")
        } else{
            const validToken = await Token.getOneByToken(userToken);
            if(!validToken){
                throw new Error("Not a valid token!")
            } else{
                next();
            }
        }

    }catch(err){
        res.status(403).json({error: err.message})
    }
}

module.exports = authenticator;
