CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    year INT,
    pages INT,
    isbn VARCHAR(255),
    img VARCHAR(255),
    imgHD VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    delete_time TIMESTAMP
);