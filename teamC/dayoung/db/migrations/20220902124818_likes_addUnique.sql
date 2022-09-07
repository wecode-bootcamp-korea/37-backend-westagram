-- migrate:up
ALTER likes ADD UNIQUE(user_id, post_id);

-- migrate:down

