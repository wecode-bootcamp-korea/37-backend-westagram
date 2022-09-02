-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- migrate:down
DROP TABLE likes;
