-- CREATE TABLE test_time (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     time TIMESTAMP
-- );
-- INSERT INTO test_time (time)
-- VALUES (NOW()),
--     (date_add(NOW(), interval 5 day)),
-- (date_add(NOW(), interval -5 day));
-- SELECT * FROM test_time WHERE DATE(time) > NOW()
-- ALTER TABLE books
-- ADD COLUMN delete_time TIMESTAMP AFTER description;
-- DROP TABLE book_author_id;
-- SELECT JSON_ARRAYAGG(JSON_OBJECT(
--     'id', id, 
--     'year', year,
--     'pages',pages,
--     'isbn',isbn,
--     'img',img,
--     'imgHD',imgHD,
--     'title',title,
--     'description',description
-- ))from books;
-- SELECT name, price, options, GROUP_CONCAT(photo, ', ')
-- FROM food, food_menu
-- ALTER TABLE authors
-- RENAME COLUMN name TO author;

-- SELECT books.title, GROUP_CONCAT(book_author_id.author_id separator ', ') 
-- FROM books
-- JOIN book_author_id ON book_author_id.book_id = books.book_id
-- GROUP BY books.book_id

-- SELECT 
--     books.book_id AS id, 
--     books.title, 
--     GROUP_CONCAT(authors.author separator ', ') AS authors,
--     books.img, 
--     books.year, 
--     books.pages, 
--     books.isbn, 
--     books.imgHD, 
--     books.description
-- FROM books
--     JOIN authors ON authors.author_id IN 
--         (SELECT author_id FROM book_author_id WHERE book_author_id.book_id = books.book_id)
-- GROUP BY books.book_id

SELECT 
    books.book_id AS id, 
    books.title, 
    GROUP_CONCAT(authors.author separator ', ') AS authors,
    books.img, 
    books.year, 
    books.pages, 
    books.isbn, 
    books.imgHD, 
    books.description
FROM books
    JOIN authors ON authors.author_id IN 
        (SELECT author_id FROM book_author_id WHERE book_author_id.book_id = books.book_id)
WHERE books.book_id = '5'
GROUP BY books.book_id
