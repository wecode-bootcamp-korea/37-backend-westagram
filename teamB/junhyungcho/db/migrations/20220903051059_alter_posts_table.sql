-- migrate:up
ALTER TABLE posts ADD COLUMN users_id INT NOT NULL;

-- migrate:down
DROP TABLE posts;