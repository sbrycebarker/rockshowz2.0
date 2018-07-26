module.exports = {
  read: function(req, res, next) {
    var db = req.app.get('db');
    db.getFaveVenues(req.user[0].user_id).then(faves => {
      console.log("getfave", req.user[0].user_id);
        res.status(200).json(faves);
    })
  },
  create: function(req, res, next) {
    console.log("venue to add", req.body );
    var db = req.app.get('db');
    db.addToFaveVenues([req.body.user, req.body.venue_name]).then(added => {
        res.status(200).json(added);
    })
  },
  delete: function(req, res, next) {
    var db = req.app.get('db');
    db.removeFaveVenueById([req.params.userid, req.params.venue_name]).then(deleted => {
      console.log('DeleteV', req.params.userid, req.params.venue_name);
        res.status(200).json(deleted);
    })
  }
}
