DROP TABLE IF EXISTS book_rental CASCADE;
DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE book_rental (
    rental_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id),
    book_id INT REFERENCES book(book_id),
    rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT REFERENCES user_account(user_id),
    book_id INT REFERENCES book(book_id),
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
)
