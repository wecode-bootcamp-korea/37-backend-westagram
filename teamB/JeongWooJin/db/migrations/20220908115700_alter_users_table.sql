-- migrate:up
ALTER TABLE users change profileImage profile_image VARCHAR(1000);

-- migrate:down

