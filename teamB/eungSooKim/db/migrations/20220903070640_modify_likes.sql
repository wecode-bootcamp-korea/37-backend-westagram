-- migrate:up

ALTER TABLE likes ADD UNIQUE (user_id, post_id);


-- migrate:down

DROP TABLE likes;