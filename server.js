const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive'),
    auth0 = require('auth0-js'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    config = require('./config.js'),
    cors = require('cors');
    connectionString = "postgres://postgres:1234a@localhost/rockshow";

    const app = express();

    app.use(bodyParser.json())
    app.use(cors())
    app.use(session({
      resave: true, //Without this you get a constant warning about default values
      saveUninitialized: true, //Without this you get a constant warning about default values
      secret: 'keyboardcat'
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static('./public'))

    massive(connectionString).then(function(db) {
        app.set('db', db);
        passport.use(new Auth0Strategy({
           domain:       config.auth0.domain,
           clientID:     config.auth0.clientID,
           clientSecret: config.auth0.clientSecret,
           callbackURL:  '/auth/callback'
          },
          function(accessToken, refreshToken, extraParams, profile, done) {
            //Find user in database
            db.getUserByAuthId([profile.id], function(err, user) {
              user = user[0];
              if (!user) { //if there isn't one, we'll create one!
                console.log('CREATING USER');
                db.createUserByAuth([profile.displayName, profile.id], function(err, user) {
                  console.log(err)
                  console.log('USER CREATED', user);
                  return done(err, user[0]); // GOES TO SERIALIZE USER
                })
              } else { //when we find the user, return it
                console.log('FOUND USER', user);
                return done(err, user);
              }
            })
          }
        ));
    })
    // 1234a password
    // app.get('/artists/incubus/events', bands.read)




    app.get('/auth', passport.authenticate('auth0'));

    app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})
  app.get('/auth/me', function(req, res) {
    if (!req.user) return res.sendStatus(404);
    res.status(200).send(req.user);
  })
  app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })


          var port = 3000
      app.listen(port, function() {
        console.log("listining on port " + port)
      })
