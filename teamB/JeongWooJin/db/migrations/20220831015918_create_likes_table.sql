-- migrate:up
CREATE TABLE likes
(
Id int not null auto_increment,
user_id INT NOT NULL,
post_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (post_id) REFERENCES users (id)
);

-- migrate:down

