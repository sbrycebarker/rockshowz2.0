let express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive')
    cors = require('cors');

    var app = express();

    app.use(bodyParser.json())
    app.use(cors());

    // app.get('/artists/incubus/events', bands.read)


    app.use(express.static('./public'))
          var port = 3000
      app.listen(port, function() {
        console.log("listining on port " + port)
      })
