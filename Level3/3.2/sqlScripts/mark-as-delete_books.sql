UPDATE books
SET delete_time = date_add(NOW(), interval 5 day)
WHERE book_id = '1'