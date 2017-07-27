INSERT into favorite_bands (user_id, band_id, band_name, auth_id) values
($1, $2, $3, $4) returning band_name;
