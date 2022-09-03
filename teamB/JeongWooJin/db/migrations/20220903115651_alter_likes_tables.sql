-- migrate:up
ALTER TABLE likes
CONSTRAINT unique_likes UNIQUE (user_id, post_id)

-- migrate:down

