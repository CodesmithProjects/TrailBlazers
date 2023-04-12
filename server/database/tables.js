
// accounts table

CREATE TABLE accounts (
  user_id serial PRIMARY KEY,
  email VARCHAR ( 255 ) UNIQUE NOT NULL
);


// favorite trails table

CREATE TABLE favorite_trails (
  fav_id serial PRIMARY KEY,
  user_id integer REFERENCES accounts (user_id),
  trail_api VARCHAR ( 255 ) NOT NULL,
  trail_name VARCHAR ( 255 ) NOT NULL
);

// inner join query

SELECT accounts.user_id, trail_api, trail_name
FROM accounts
INNER JOIN favorite_trails
ON favorite_trails.user_id = accounts.user_id;