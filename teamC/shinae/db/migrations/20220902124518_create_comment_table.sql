-- migrate:up
CREATE TABLE comments(
	id INT NOT NULl AUTO_INCREMENT,
	content VARCHAR(3000) NOT NULL,
	user_id INT NOT NULl,
	post_id INT NOT NULl,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id),
	CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
	CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- migrate:down

