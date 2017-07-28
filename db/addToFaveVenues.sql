INSERT into favorite_venues (user_id, venue_name)
values ($1, $2) returning venue_name
