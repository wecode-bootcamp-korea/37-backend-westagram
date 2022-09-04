-- migrate:up
CREATE TABLE comments
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Content varchar(3000) not null,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- migrate:down
drop table comments
