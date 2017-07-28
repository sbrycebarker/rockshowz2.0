module.exports = {
  read: function(req, res, next) {
    var db = req.app.get('db')
    db.getFavoritebands(req.user.user_id).then(faves => {
        res.status(200).json(faves)
    })
  },
  create: function(req, res, next) {
    console.log("band to add", req.body )
    var db = req.app.get('db')
    db.addToFaveBands([ req.body.user , req.body.name ]).then(added => {
        res.status(200).json(added)
    })
  },
  delete: function(req, res, next) {
    console.log("delteB", req.params)
    var db = req.app.get('db')
    db.removeFaveBandById([req.params.userid , req.params.band_name]).then(deleted =>{
        res.status(200).json(deleted)
    })
  }
}
