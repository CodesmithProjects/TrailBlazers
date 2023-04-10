
// accounts table

CREATE TABLE accounts (
  user_id serial PRIMARY KEY,
  email VARCHAR ( 255 ) UNIQUE NOT NULL
);


// favorite trails table

CREATE TABLE favorite_trails (
  fav_id serial PRIMARY KEY,
  user_id integer REFERENCES accounts (user_id),
  trail_api VARCHAR ( 255 ) UNIQUE NOT NULL
);