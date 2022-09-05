-- migrate:up
create table likes (
    id int not null auto_increment,
    user_id int not null,
    post_id int not null,
    primary key (id),
    foreign key (user_id) references users (id),
    foreign key (post_id) references posts (id)
);

-- migrate:down
drop table likes;
