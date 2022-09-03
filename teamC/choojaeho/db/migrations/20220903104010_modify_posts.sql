-- migrate:up
ALTER TABLE posts ADD COLUMN posts_image VARCHAR (1000) NULL
-- migrate:down

