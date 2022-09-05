-- migrate:up
CREATE TABLE comments
(
Content varchar(3000) not null,
user_id INT NOT NULL,
post_id INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (post_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE comments;