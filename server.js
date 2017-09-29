const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    http = require("http"),
    request = require('request'),
    query = require('querystring'),
    Auth0Strategy = require('passport-auth0'),
    passport = require('passport'),
    config = require('./config.js'),
    cors = require('cors');
    connectionString = "postgres://postgres:1234a@localhost/rockshow"
    elephantconnection = "postgres://vlzurcyw:Qhol7vKSqVR12FCJZ5GhPJCnWVkLx_Xc@tantor.db.elephantsql.com:5432/vlzurcyw";
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

    massive(elephantconnection).then((db) => {
        app.set('db', db);
        // db.users_create_seed().then(
        //   function() {
        //     console.log("user table created")
        //   }
        // )
        // .catch(
        //   function(err){
        //     console.log("user table err", err)
        //   })
        // db.favebands_create_seed().then(
        //   function() {
        //     console.log("band table created")
        //   }
        // )
        // .catch(
        //   function(err){
        //     console.log("band table err", err)
        //   })
        // db.favevenues_create_seed().then(
        //   function() {
        //     console.log("venue table created")
        //   }
        // )
        // .catch(
        //   function(err){
        //     console.log("venue table err", err)
        //   })
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
              console.log('gettinguser', profile.id)
              if (!user[0]) {
                 //if there isn't one, we'll create one!
                console.log("creating user", profile)
                db.createUserByAuth([profile.displayName, profile.id]).then(function(user2) {
                  console.log('USER CREATED', user2);
                  return done("user2 created", user2);
                })
              } else {
                console.log("found User", user.username)
                // user = user[0]
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
      let users = require('./server/users')

    // app.get('/all/users', users.index)
    app.get('/favorites/bands/:userId', favebands.read)
    app.get('/favorites/venues/:userId', favevenues.read)
    app.post('/favorites/bands', favebands.create)
    app.post('/favorites/venues', favevenues.create)
    app.delete('/favorites/bands/:userid/:band_name', favebands.delete)
    app.delete('/favorites/venues/:userid/:venue_name', favevenues.delete)

// <<==================END OF FAVORITES==========================>>


          var port = 8081
      app.listen(port, function() {
        console.log("listening on port " + port)
      })
