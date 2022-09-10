-- migrate:up
ALTER TABLE users 
    ADD COLUMN password VARCHAR(200) NOT NULL,
    ADD COLUMN email VARCHAR(200) NOT NULL UNIQUE,
    ADD COLUMN profile_image VARCHAR(1000) NULL;

-- migrate:down
DROP TABLE users;