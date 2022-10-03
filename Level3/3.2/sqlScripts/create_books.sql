CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    year INT,
    pages INT,
    isbn VARCHAR(255),
    img VARCHAR(255),
    imgHD VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    views INT DEFAULT '0' NOT NULL,
    clicks INT INT DEFAULT '0' NOT NULL,
    delete_time TIMESTAMP
);