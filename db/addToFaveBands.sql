INSERT into favorite_bands (user_id, band_name) values
($1, $2) returning band_name;
