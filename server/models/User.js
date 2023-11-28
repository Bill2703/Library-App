const db = require('../database/connect');

class User {

    constructor({ user_id, username, password, is_admin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.isAdmin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            console.log("model error");
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, email, fullName, isAdmin = false } = data;
    
        let response = await db.query(
            "INSERT INTO user_account (username, password, email, fullName) VALUES ($1, $2, $3, $4) RETURNING user_id;",
            [username, password, email, fullName]
        );
    
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
    
}

module.exports = User;