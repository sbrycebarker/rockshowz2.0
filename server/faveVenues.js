module.exports = {
  read: function(req, res, next) {
    // console.log("server", req.user.user_id)
    var db = req.app.get('db')
    db.getFaveVenues(req.user.user_id).then(faves => {
        res.status(200).json(faves)
    })
  },
  create: function(req, res, next) {
    console.log("venue to add", req.body )
    var db = req.app.get('db')
    db.addToFaveVenues([req.body.user, req.body.venue_name]).then(added => {
        res.status(200).json(added)
    })
  },
  delete: function(req, res, next) {
    console.log('DeleteV', req.params)
    var db = req.app.get('db')
    db.removeFaveVenueById([req.params.userid, req.params.venue_name]).then(deleted =>{
        res.status(200).json(deleted)
    })
  }
}
