CREATE TABLE IF NOT EXISTS favorite_bands (
  id serial primary key,
  user_id integer references users(user_id),
  band_name text
);
