insert into public.users (username, authid)
values ($1, $2) returning username, authid;
