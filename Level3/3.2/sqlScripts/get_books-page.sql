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
        (SELECT author_id FROM book_author_id 
        WHERE book_author_id.book_id = books.book_id)
GROUP BY books.book_id