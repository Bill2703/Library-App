DROP TABLE IF EXISTS book;

CREATE TABLE book (
    book_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    author VARCHAR (50) NOT NULL,
    blurb VARCHAR (500) NOT NULL,
    stock INT,
    PRIMARY KEY (book_id)
);

INSERT INTO book (title, author, blurb, stock) VALUES
  ('To Kill a Mockingbird', 'Harper Lee', 'Set in the racially charged atmosphere of the American South during the 1930s, "To Kill a Mockingbird" explores themes of justice, morality, and compassion through the eyes of Scout Finch, a young girl witnessing her father''s struggle to defend an innocent black man accused of rape.', 4),
  ('1984', 'George Orwell', 'George Orwell''s dystopian masterpiece, "1984," envisions a totalitarian future where a powerful government, led by the Party and its enigmatic figurehead Big Brother, controls every aspect of life. It serves as a chilling warning about the dangers of unchecked authority and the manipulation of truth.', 5),
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'F. Scott Fitzgerald''s classic novel, "The Great Gatsby," explores the decadence and disillusionment of the American Dream in the roaring 1920s. Through the eyes of the enigmatic Jay Gatsby, readers are drawn into the world of excess, love, and tragedy.', 1),
  ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 'J.K. Rowling''s magical debut introduces readers to the young wizard Harry Potter as he embarks on his journey at Hogwarts School of Witchcraft and Wizardry. Filled with friendship, adventure, and the battle between good and evil, it captivates audiences of all ages.', 6),
  ('The Catcher in the Rye', 'J.D. Salinger', 'J.D. Salinger''s iconic novel follows the experiences of Holden Caulfield, a disenchanted teenager navigating the challenges of adolescence in New York City. With its authentic voice and exploration of alienation, it has become a timeless coming-of-age story.', 2),
  ('The Lord of the Rings', 'J.R.R. Tolkien', 'J.R.R. Tolkien''s epic fantasy trilogy, "The Lord of the Rings," takes readers on a journey through the enchanting realms of Middle-earth. Filled with hobbits, elves, dwarves, and the ultimate battle between good and evil, it remains a cornerstone of fantasy literature.', 9),
  ('The Da Vinci Code', 'Dan Brown', 'Dan Brown''s gripping thriller combines art, history, and mystery as symbologist Robert Langdon races to unravel a code that could reveal a secret that has been guarded for centuries. A fast-paced adventure that keeps readers on the edge of their seats.', 2),
  ('The Hunger Games', 'Suzanne Collins', 'In a dystopian future, Suzanne Collins'' "The Hunger Games" follows Katniss Everdeen as she fights for survival in a televised competition where only one can emerge victorious. The novel explores themes of power, sacrifice, and rebellion.', 6),
  ('Pride and Prejudice', 'Jane Austen', 'Jane Austen''s timeless romantic novel, "Pride and Prejudice," follows the spirited Elizabeth Bennet as she navigates societal expectations, family dynamics, and the complexities of love in early 19th-century England.', 7),
  ('The Girl on the Train', 'Paula Hawkins', 'Paula Hawkins'' psychological thriller revolves around a woman named Rachel who becomes entangled in a missing person investigation. Told from multiple perspectives, the novel keeps readers guessing as secrets unravel and truths are exposed.', 1),
  ('Gone Girl', 'Gillian Flynn', 'Gillian Flynn''s psychological thriller, "Gone Girl," unfolds a twisted tale of a marriage gone wrong. As Nick and Amy''s seemingly perfect relationship unravels, the novel keeps readers questioning the truth and motives behind their actions.', 1),
  ('The Help', 'Kathryn Stockett', 'Set in Mississippi during the 1960s, Kathryn Stockett''s "The Help" tells the story of African American maids and their relationships with the families they work for. The novel explores themes of race, friendship, and the quest for social justice.', 9),
  ('The Fault in Our Stars', 'John Green', 'John Green''s heart-wrenching and uplifting novel follows Hazel Grace Lancaster and Augustus Waters, two teenagers battling cancer, as they navigate love, loss, and the pursuit of meaning in a beautifully written exploration of the human condition.', 11),
  ('The Alchemist', 'Paulo Coelho', 'Paulo Coelho''s philosophical novel, "The Alchemist," follows Santiago, a shepherd boy, on a journey to discover his personal legend. Filled with wisdom and spirituality, it''s a timeless tale about pursuing one''s dreams and the transformative power of the journey.', 2),
  ('A Game of Thrones', 'George R.R. Martin', 'The first book in George R.R. Martin''s "A Song of Ice and Fire" series, "A Game of Thrones," introduces readers to the intricate political and social landscapes of the Seven Kingdoms. Filled with complex characters and unpredictable twists, it has become a landmark in epic fantasy literature.', 4)
