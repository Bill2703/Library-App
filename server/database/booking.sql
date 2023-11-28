DROP TABLE IF EXISTS book_rental CASCADE;

CREATE TABLE book_rental (
    rental_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id),
    book_id INT REFERENCES book(book_id),
    rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
