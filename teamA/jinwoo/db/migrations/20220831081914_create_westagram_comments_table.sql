-- migrate:up
CREATE TABLE commentsWesta (
  id int not null auto_increment primary key,
  content varchar(3000) not null,
  user_id int not null,
  post_id int not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp null on update current_timestamp,
  foreign key (user_id) references usersWesta(id),
  foreign key (post_id) references postsWesta(id)
);

-- migrate:down
DROP TABLE commentsWesta;