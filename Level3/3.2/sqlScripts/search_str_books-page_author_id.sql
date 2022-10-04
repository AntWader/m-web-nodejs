id IN (
    SELECT book_id
    FROM book_author_id
    WHERE book_author_id.author_id = '1')