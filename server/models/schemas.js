// create accounts table

`CREATE TABLE accounts (
  account_id serial,
  google_id VARCHAR ( 255 ) UNIQUE NOT NULL
);`

// create favorite_trails table

`CREATE TABLE favorite_trails (
  fav_id serial PRIMARY KEY,
  google_id VARCHAR REFERENCES accounts (google_id) NOT NULL,
  trail_id VARCHAR ( 255 ) NOT NULL,
  trail_name VARCHAR ( 255 ) NOT NULL
);`

// create reviews table

`CREATE TABLE reviews (
  review_id serial PRIMARY KEY,
  trail_id VARCHAR ( 255 ) NOT NULL,
  name VARCHAR ( 255 ) NOT NULL,
  review VARCHAR,
  stars integer NOT NULL
);`