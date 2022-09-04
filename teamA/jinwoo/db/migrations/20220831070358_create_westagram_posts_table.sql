-- migrate:up
CREATE TABLE postsWesta (
  id int not null auto_increment primary key,
  title varchar(100) not null,
  content varchar(3000) null,
  user_id int not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp null on update current_timestamp,
  foreign key (user_id) references usersWesta(id)
);

-- migrate:down
DROP TABLE postsWesta;