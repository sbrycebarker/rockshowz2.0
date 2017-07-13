let express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive'),
    http = require("http"),
    request = require('request'),
    query = require('querystring'),
    SECRET = require('./secret.js'),
    cors = require('cors');

    var app = express();

    const client_id = "915c4e67aa804345b234fc3290ae7e91",
          client_secret = SECRET;

    app.use(bodyParser.json())
    app.use(cors());

    // app.get('/artists/incubus/events', bands.read)
    
    //This section is for Spotify API
    http.createServer(function(req, res) {
         res.writeHead(200, {"Content-Type": "text/plain"});
         res.write("Hello World");
         res.end();
      }).listen(8888);

    app.use(express.static('./public'))
          var port = 3000
      app.listen(port, function() {
        console.log("listening on port " + port)
      })
