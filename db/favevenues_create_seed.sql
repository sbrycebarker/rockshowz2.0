CREATE TABLE IF NOT EXISTS favorite_venues (
  id serial primary key,
  user_id integer references users(user_id),
  venue_name text
);
