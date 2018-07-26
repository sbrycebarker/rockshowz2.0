const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      http = require("http"),
      request = require('request'),
      query = require('querystring'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'),
      cors = require('cors'),
      reload = require('reload'),
      config = require('./server/config.js');
      connectionString = "postgres://postgres:1234a@localhost/rockshow";
      elephantconnection = "postgres://vlzurcyw:Qhol7vKSqVR12FCJZ5GhPJCnWVkLx_Xc@tantor.db.elephantsql.com:5432/vlzurcyw";

      const app = express();

//  ===================================== Setup =============================================

    app.use(bodyParser.json());
    app.use(cors());
    app.use(session({
      resave: true, //Without this you get a constant warning about default values
      saveUninitialized: true, //Without this you get a constant warning about default values
      secret: config.secret
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static('./public'));
    massive(elephantconnection).then((db) => {
    app.set('db', db);
    passport.use(new Auth0Strategy({
       domain:       config.auth0.domain,
       clientID:     config.auth0.clientID,
       clientSecret: config.auth0.clientSecret,
       callbackURL:  '/callback'
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        db.getUserByAuthId([profile.id]).then(function(user) {
          console.log('gettinguser', user);
          if (!user[0]) {
             //if there isn't one, we'll create one!
            // console.log("creating user", profile)
            db.createUserByAuth([profile.displayName, profile.id]).then(function(user2) {
              // console.log('USER CREATED', user2);
              return done(null, profile);
            })
          } else {
            // console.log("found User", profile)
            // user = user[0]
            return done(null , user);
          }
        })
        return done(null, profile);
      }
    ));
    })

// ======================================= Auth0 Login =======================================
    passport.serializeUser(function(userA, done) {
      console.log('serializing', userA);
      let userB = userA;
      done(null, userB); //PUTS 'USER' ON THE SESSION
    });

    //USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
    passport.deserializeUser(function(userB, done) {
      let userC = userB;
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
      if (!req.user){
        return res.send(null);
      } else {
        console.log("me", req.user);
        res.status(200).send(req.user);
      }
    })

    app.get('/auth/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    })


// =================================================== End of Auth0 Login ==================================
// ================================================== ENDPOINTS =========================================

let favebands = require('./server/bands');
let favevenues = require('./server/venues');
let users = require('./server/users');

// app.get('/all/users', users.index)
app.get('/favorites/bands/:userId', favebands.read);
app.get('/favorites/venues/:userId', favevenues.read);
app.post('/favorites/bands', favebands.create);
app.post('/favorites/venues', favevenues.create);
app.delete('/favorites/bands/:userid/:band_name', favebands.delete);
app.delete('/favorites/venues/:userid/:venue_name', favevenues.delete);

// ================================================== ENDPOINTS =========================================
reload(app);

let port = 8080;
app.listen(port, function() {
console.log("listening on port " + port)
});
