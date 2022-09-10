-- migrate:up
ALTER TABLE likes ADD UNIQUE user_post (user_id, post_id);

-- migrate:down

