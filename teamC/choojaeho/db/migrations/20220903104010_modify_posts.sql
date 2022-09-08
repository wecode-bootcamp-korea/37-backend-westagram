-- migrate:up
ALTER TABLE posts ADD COLUMN posts_image VARCHAR (1000) NULL,
ALTER TABLE likes ADD CONSTRAINT likes_Unique UNIQUE (user_id, post_id)
-- migrate:down

