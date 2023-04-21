CREATE TABLE favorite_trails (
  fav_id serial PRIMARY KEY NOT NULL,
  google_id varchar(255) NOT NULL,
  trail_id varchar(255) NOT NULL,
  trail_name varchar(255) NOT NULL
  );

  CREATE TABLE reviews (
    review_id serial PRIMARY KEY NOT NULL,
    trail_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    review varchar NOT NULL,
    stars integer NOT NULL
  );

