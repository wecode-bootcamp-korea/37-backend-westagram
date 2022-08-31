-- migrate:up
CREATE TABLE likes
(
    id int not null auto_increment,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id)
);
-- migrate:down
drop table likes
