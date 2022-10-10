DELETE FROM books
WHERE DATE(delete_time) < (NOW());
DELETE FROM book_author_id
WHERE DATE(delete_time) < (NOW());
DELETE FROM authors
WHERE DATE(delete_time) < NOW();