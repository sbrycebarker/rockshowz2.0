const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    http = require("http"),
    request = require('request'),
    query = require('querystring'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    config = require('./config.js'),
    cors = require('cors');
    connectionString = "postgres://postgres:1234a@localhost/rockshow";
    // 1234a password
    const app = express();

// <<===========================SERVER SETUP======================>>


    app.use(bodyParser.json())
    app.use(cors())
    app.use(session({
      resave: true, //Without this you get a constant warning about default values
      saveUninitialized: true, //Without this you get a constant warning about default values
      secret: 'pizzaisgood'
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static('./public'))

    massive(connectionString).then((db) => {
        app.set('db', db);

// <<=================SERVER SETUP ENDS========================>>

// <<========================LOGIN=================================>>

        passport.use(new Auth0Strategy({
           domain:       config.auth0.domain,
           clientID:     config.auth0.clientID,
           clientSecret: config.auth0.clientSecret,
           callbackURL:  '/callback'
          },
          function(accessToken, refreshToken, extraParams, profile, done) {
            db.getUserByAuthId([profile.id]).then(function(user) {
              console.log('gettinguser', user)

              if (!user[0]) {
                 //if there isn't one, we'll create one!
                console.log('CREATING USER');
                db.createUserByAuth([profile.displayName, profile.id]).then(function(user2) {
                  console.log('USER CREATED', user2[0].username);
                  return done("user2", user2[0].username);

                })
              } else {
                console.log("found User", user[0].username)
                user = user[0].username
                return done(null , user);
              }
            })
          }
        ));

    })
      passport.serializeUser(function(userA, done) {
      console.log('serializing', userA);
      var userB = userA;
      done(null, userB); //PUTS 'USER' ON THE SESSION
      });

      //USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
      passport.deserializeUser(function(userB, done) {
      var userC = userB;
      //Things you might do here :
      // Query the database with the user id, get other information to put on req.user
      done(null, userC); //PUTS 'USER' ON REQ.USER
      });

      app.get('/auth', passport.authenticate('auth0'));

      app.get('/callback',
        passport.authenticate('auth0', { failureRedirect: '/login' }),
        function(req, res) {
          if (!req.user) {
            throw new Error('user null');
          }
          res.redirect("/");
        }
      );
      app.get('/login',
        passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
        res.redirect("/");
      });
      // app.get('/auth/callback', function(req, res, next) {
      //   console.log("callback");
      //    next();
      //  },
      // //  passport.authenticate('auth0', { successRedirect: '/' }),
      // //   function(req, res) {
      // //     console.log('redirecting')
      // //   }
      // passport.authenticate('auth0', { failureRedirect: '/' }),
      //     function(req, res) {
      //       console.log('redirecting')
      //       if (!req.user) {
      //         console.log("err")
      //         throw new Error('user null');
      //       }
      //       console.log("redirect2")
      //       res.redirect("/");
      // });

      app.get('/auth/me', function(req, res) {
        if (!req.user) return res.sendStatus(404);
        console.log("me", req.user)
        res.status(200).send(req.user);
      })

      app.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/');
      })

    // 1234a password
    // app.get('/artists/incubus/events', bands.read)

    

// <<====================LOGIN ENDS================================>>

// <<====================FAVORITES===============================>>
      let favebands = require('./server/favebands')
      let favevenues = require('./server/favevenues')


    app.get('/favorites/bands/:userId', favebands.read)
    app.get('/favorites/venues/:userId', favevenues.read)
    app.post('/favorites/bands/', favebands.create)
    app.post('/favorites/venues', favevenues.create)
    app.delete('/favorites/:userId/:bandId', favebands.delete)
    app.delete('/favorites/:userId/:venueId', favevenues.delete)

// <<==================END OF FAVORITES==========================>>


          var port = 3000
      app.listen(port, function() {
        console.log("listening on port " + port)
      })
