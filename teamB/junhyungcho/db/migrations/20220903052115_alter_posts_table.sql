-- migrate:up
ALTER TABLE posts 
ADD CONSTRAINT users_id_fkey FOREIGN KEY (users_id) REFERENCES users(id);

-- migrate:down
DROP TABLE posts;