-- Purpose: Store user registration details.
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    fullName VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id)
);

CREATE TABLE token(
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);