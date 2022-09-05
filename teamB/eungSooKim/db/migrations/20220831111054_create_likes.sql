-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
<<<<<<< HEAD
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (post_id) REFERENCES posts(id),
    (user_id,post_id) UNIQUE KEY
    
=======
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    (user_id, post_id) UNIQUE KEY
>>>>>>> fe061099bf24379345e4e67545100d7b860ad122
);

-- migrate:down
DROP TABLE likes;