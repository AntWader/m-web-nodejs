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
SELECT JSON_ARRAYAGG(JSON_OBJECT(
    'id', id, 
    'year', year,
    'pages',pages,
    'isbn',isbn,
    'img',img,
    'imgHD',imgHD,
    'title',title,
    'description',description
))from books;