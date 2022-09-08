-- migrate:up
ALTER TABLE users modify email VARCHAR(200) NOT NULL UNIQUE;

-- migrate:down

