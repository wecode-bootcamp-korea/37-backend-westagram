-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    users_id INT NOT NULL,
    posts_id INT NOT NULL,
    CONSTRAINT user_id_fkey FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT post_id_fkey FOREIGN KEY (posts_id) REFERENCES posts(id)
);

-- migrate:down
DROP TABLE likes;