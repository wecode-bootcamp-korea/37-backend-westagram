-- migrate:up
create table posts (
    id int not null,
    title varchar(100) not null,
    content varchar(3000) null,
    user_id int not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null on update current_timestamp,
    primary key (id),
    foreign key (user_id) references users (id)
);

-- migrate:down
drop table posts;
