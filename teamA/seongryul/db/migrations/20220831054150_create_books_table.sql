-- migrate:up
CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KET,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(2000) NULL,
    cover_image VARCHAR(1000) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE books;
