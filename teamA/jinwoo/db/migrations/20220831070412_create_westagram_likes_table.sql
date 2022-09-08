-- migrate:up
CREATE TABLE likesWesta (
  id int not null auto_increment primary key,
  user_id int not null,
  post_id int not null,
  foreign key (user_id) references usersWesta(id),
  foreign key (post_id) references postsWesta(id)
);

-- migrate:down
DROP TABLE likesWesta;